import { useGetUnitsWithAllOutputLazyQuery, useCreateUnitNodeEdgeMutation } from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react'
import DefaultInput from '@primitives/defaultInput'
import { ResultType } from '@rootTypes/resultEnum'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'

interface UnitNodeEdgeFormProps {
    currentNodeData: any;
}

export default function UnitNodeEdgeCreateForm({ currentNodeData }: UnitNodeEdgeFormProps) {

    const [errorState, setErrorState] = useState({
        searchString: false,
    });
    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });

    const [ collapsedUnits, setCollapsedUnits ] = useState<{ [key: string]: boolean }>({});

    const [ searchString, setSearchString ] = useState('');
    const [ data, setData ] = useState<any>(null);

    const [ getUnitsWithAllOutput ] = useGetUnitsWithAllOutputLazyQuery();
    const [ createUnitNodeEdgeMutation ] = useCreateUnitNodeEdgeMutation();

    useEffect(() => {
        setIsLoaderActive(true)
        getUnitsWithAllOutput({
            variables: {
                searchString: searchString,
                limit: 7,
                offset: 0
            }
        }).then(resultUnitsWithOutput => {
                if (resultUnitsWithOutput.data?.getUnits){
                    console.log(resultUnitsWithOutput.data.getUnits.units)
                    setIsLoaderActive(false)
                    setData(resultUnitsWithOutput.data.getUnits.units)
                }
            }
        )
    }, [searchString]);

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };

    const handleUnitToggle = (unitId: string) => {
        setCollapsedUnits(prev => ({
            ...prev,
            [unitId]: !prev[unitId]
        }));
    };

    const handleCreateEdge = (nodeUuid: string) => {
        setIsLoaderActive(true)
        setResultData({
            ...resultData,
            message: null
        })
        console.log(nodeUuid, currentNodeData.uuid)
        createUnitNodeEdgeMutation({
            variables: {
                nodeOutputUuid: nodeUuid,
                nodeInputUuid: currentNodeData.uuid
            }
        }).then(ResultData =>{
            if (ResultData.data){
                setIsLoaderActive(false)
                setResultData({ type: ResultType.Happy, message: "Edge успешно создан"})
            }
        }).catch(error => {
            setIsLoaderActive(false)
            setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
        })
    };

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            <form>
                <DefaultInput
                    id="name_set"
                    type="text"
                    placeholder="Search by Unit name"
                    value={searchString}
                    validateState={searchString}
                    onChange={setSearchString}
                    validateFunc={() => (null)}
                    setIsErrorExist={(hasError) => updateErrorState('searchString', hasError)}
                    setResultData={setResultData}
                />
            </form>
            <div className="unit-list">
                {data && data.map((unit: any) => (
                    <div key={unit.uuid} className="unit-item">
                        <button className="unit-header" onClick={() => handleUnitToggle(unit.uuid)}>
                            <h3>{unit.name + ' ' + unit.visibilityLevel}</h3>
                        </button>
                        
                        {collapsedUnits[unit.uuid] && (
                            <div className="unit-nodes">
                                {unit.outputUnitNodes.map((node: any) => (
                                    <button key={node.uuid} className="unit-node" onClick={() => handleCreateEdge(node.uuid)}>
                                        <h4>{node.topicName}</h4>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}