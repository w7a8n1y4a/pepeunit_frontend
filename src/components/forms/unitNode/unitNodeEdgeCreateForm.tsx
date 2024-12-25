import { useResultHandler } from '@rootTypes/useResultHandler';
import { useGetUnitsWithUnitNodesLazyQuery, useCreateUnitNodeEdgeMutation, UnitNodeTypeEnum } from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import PaginationControls from '@primitives/pagination';
import IterationList from '@primitives/iterationList'
import '../form.css'

interface UnitNodeEdgeFormProps {
    currentNodeData: any;
}

export default function UnitNodeEdgeCreateForm({ currentNodeData }: UnitNodeEdgeFormProps) {
    const { resultData, setResultData, handleError, handleSuccess } = useResultHandler();

    const [errorState, setErrorState] = useState({
        searchString: false,
    });
    const [isLoaderActive, setIsLoaderActive] = useState(false)

    const [ searchString, setSearchString ] = useState('');
    const [ data, setData ] = useState<any>(null);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const [ getUnitsWithUnitNodes ] = useGetUnitsWithUnitNodesLazyQuery();
    const [ createUnitNodeEdgeMutation ] = useCreateUnitNodeEdgeMutation();

    useEffect(() => {
        setIsLoaderActive(true)
        getUnitsWithUnitNodes({
            variables: {
                searchString: searchString,
                limit: itemsPerPage,
                offset: currentPage * itemsPerPage,
                unitNodeType: [UnitNodeTypeEnum.Output]
            }
        }).then(resultUnitsWithOutput => {
            if (resultUnitsWithOutput.data?.getUnits){
                setTotalCount(resultUnitsWithOutput.data.getUnits.count);
                setData(resultUnitsWithOutput.data.getUnits.units)
            }
        }).catch(error => {
            handleError(error);
        }).finally(() => {
            setIsLoaderActive(false);
        });
    }, [searchString, currentPage]);

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };

    const handleCreateEdge = (nodeUuid: string) => {
        setIsLoaderActive(true)
        createUnitNodeEdgeMutation({
            variables: {
                nodeOutputUuid: nodeUuid,
                nodeInputUuid: currentNodeData.uuid
            }
        }).then(ResultData =>{
            if (ResultData.data){
                handleSuccess("Edge success create")
            }
        }).catch(error => {
            handleError(error);
        }).finally(() => {
            setIsLoaderActive(false);
        });
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