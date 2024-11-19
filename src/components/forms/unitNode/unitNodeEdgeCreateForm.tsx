import { useGetUnitsWithAllOutputLazyQuery, useCreateUnitNodeEdgeMutation } from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react'
import DefaultInput from '@primitives/defaultInput'
import { ResultType } from '@rootTypes/resultEnum'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import PaginationControls from '@primitives/pagination';
import IterationList from '@primitives/iterationList'
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

            <IterationList
                items={data}
                renderType={'collapse'}
                handleCreate={handleCreateEdge}
                openModalName={null}
            />
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