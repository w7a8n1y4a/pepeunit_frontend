import { useGetUnitsWithAllOutputLazyQuery, useCreateUnitNodeEdgeMutation } from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react'
import DefaultInput from '@primitives/defaultInput'
import { ResultType } from '@rootTypes/resultEnum'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import PaginationControls from '@primitives/pagination';
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

    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const [ getUnitsWithAllOutput ] = useGetUnitsWithAllOutputLazyQuery();
    const [ createUnitNodeEdgeMutation ] = useCreateUnitNodeEdgeMutation();

    useEffect(() => {
        setIsLoaderActive(true)
        getUnitsWithAllOutput({
            variables: {
                searchString: searchString,
                limit: itemsPerPage,
                offset: currentPage * itemsPerPage
            }
        }).then(resultUnitsWithOutput => {
                if (resultUnitsWithOutput.data?.getUnits){
                    console.log(resultUnitsWithOutput.data.getUnits.units)
                    setIsLoaderActive(false)
                    setTotalCount(resultUnitsWithOutput.data.getUnits.count);
                    setData(resultUnitsWithOutput.data.getUnits.units)
                }
            }
        )
    }, [searchString, currentPage]);

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

    const totalPages = Math.ceil(totalCount / itemsPerPage);

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
                                    <div className="unit-node" key={node.uuid}>
                                        <h4>{node.topicName} {node.state}</h4>
                                        <button key={node.uuid} className="unit-node-add-button" onClick={() => handleCreateEdge(node.uuid)}>
                                            add
                                        </button>

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={() => setCurrentPage(prev => prev + 1)}
                goToPreviousPage={() => setCurrentPage(prev => prev - 1)}
            />

            <ResultQuery
                resultData={resultData}
            />
            
        </>
    );
}