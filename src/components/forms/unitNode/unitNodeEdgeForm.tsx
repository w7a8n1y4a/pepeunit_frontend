import BaseModal from '../../modal/baseModal';
import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetUnitsOutputByInputLazyQuery, useDeleteUnitNodeEdgeMutation } from '@rootTypes/compositionFunctions';
import { useState, useEffect } from 'react';
import { useModalStore } from '@stores/baseStore';
import Spinner from '@primitives/spinner';
import ResultQuery from '@primitives/resultQuery';
import PaginationControls from '@primitives/pagination';
import IterationList from '@primitives/iterationList'
import UnitNodeEdgeCreateForm from '../../forms/unitNode/unitNodeEdgeCreateForm';
import '../form.css';

import { useNodeStore } from '@stores/baseStore';

export default function UnitNodeEdgeForm() {
    const { resultData, handleError } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

    const { currentNodeData } = useNodeStore();

    const { activeModal } = useModalStore();
    const [nodeOutputs, setNodeOutputs] = useState<Array<any> | null>(null);
    const [getUnitsOutputByInputQuery] = useGetUnitsOutputByInputLazyQuery();
    const [deleteUnitNodeEdgeMutation] = useDeleteUnitNodeEdgeMutation();
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const fetchNodeOutputs = () => {
        runAsync(async () => {
            let result = await getUnitsOutputByInputQuery({
                variables: {
                    unitNodeInputUuid: currentNodeData.uuid,
                    limit: itemsPerPage,
                    offset: currentPage * itemsPerPage
                }
            })
            if (result.data) {
                setNodeOutputs(result.data.getUnits.units);
                setTotalCount(result.data.getUnits.count);
            }
        })
    };

    useEffect(() => {
        fetchNodeOutputs();
    }, [currentNodeData, currentPage, activeModal]);

    const handleDeleteEdge = (outputNodeUuid: string) => {
        runAsync(async () => {
            if (currentNodeData) {
                let result = await deleteUnitNodeEdgeMutation({
                    variables: {
                        inputUuid: currentNodeData.uuid,
                        outputUuid: outputNodeUuid
                    }
                })
                if (result.data) {
                    fetchNodeOutputs();
                }
            }
        })
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <>
            {isLoaderActive && <Spinner />}

            <IterationList
                items={nodeOutputs}
                renderType={'collapse'}
                handleDelete={handleDeleteEdge}
                openModalName={'unitNodeEdgeCreate'}
            />

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={() => setCurrentPage(prev => prev + 1)}
                goToPreviousPage={() => setCurrentPage(prev => prev - 1)}
            />

            <BaseModal
                modalName={'Поиск по Unit'}
                open={activeModal === 'unitNodeEdgeCreate'}
                openModalType={"unitNodeAddOutputToInput"} 
            >
                {currentNodeData && (
                    <UnitNodeEdgeCreateForm/>
                )}
            </BaseModal>

            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}
