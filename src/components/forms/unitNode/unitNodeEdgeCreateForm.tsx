import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { NodeType } from '@rootTypes/nodeTypeEnum'
import { useGetUnitsWithUnitNodesLazyQuery, useCreateUnitNodeEdgeMutation, UnitNodeTypeEnum } from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import PaginationControls from '@primitives/pagination';
import IterationList from '@primitives/iterationList'
import '../form.css'

import { useNodeStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';


export default function UnitNodeEdgeCreateForm() {
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { currentNodeData } = useNodeStore();

    const [errorState, setErrorState] = useState({
        searchString: false,
    });

    const [ searchString, setSearchString ] = useState('');
    const [ data, setData ] = useState<any>(null);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const [ getUnitsWithUnitNodes ] = useGetUnitsWithUnitNodesLazyQuery();
    const [ createUnitNodeEdgeMutation ] = useCreateUnitNodeEdgeMutation();

    useEffect(() => {
        runAsync(async () => {
            let result = await getUnitsWithUnitNodes({
                variables: {
                    searchString: searchString,
                    limit: itemsPerPage,
                    offset: currentPage * itemsPerPage,
                    unitNodeType: [UnitNodeTypeEnum.Output]
                }
            })
            if (result.data?.getUnits){
                setTotalCount(result.data.getUnits.count);
                setData(result.data.getUnits.units)
            }
        })
    }, [searchString, currentPage]);

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };

    const handleCreateEdge = (nodeUuid: string) => {
        runAsync(async () => {
            let result = await createUnitNodeEdgeMutation({
                variables: {
                    nodeOutputUuid: nodeUuid,
                    nodeInputUuid: currentNodeData.uuid
                }
            })
            if (result.data){
                setHappy("Edge success create")
            }
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
                />
            </form>

            <IterationList
                items={data}
                renderType={'collapse'}
                selectedEntityType={NodeType.UnitNode}
                handleCreate={handleCreateEdge}
                openModalName={null}
            />
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={() => setCurrentPage(prev => prev + 1)}
                goToPreviousPage={() => setCurrentPage(prev => prev - 1)}
            />
        </>
    );
}