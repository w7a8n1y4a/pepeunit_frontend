import BaseModal from '../../modal/baseModal';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetUnitsOutputByInputLazyQuery, useDeleteUnitNodeEdgeMutation } from '@rootTypes/compositionFunctions';
import { useState, useEffect } from 'react';
import { useModalStore } from '@stores/baseStore';
import Spinner from '@primitives/spinner';
import PaginationControls from '@primitives/pagination';
import IterationList from '@primitives/iterationList'
import UnitNodeEdgeCreateForm from '../../forms/unitNode/unitNodeEdgeCreateForm';
import '../form.css';

import { useNodeStore } from '@stores/baseStore';
import { NodeType } from '@src/rootTypes/nodeTypeEnum';

export default function UnitNodeEdgeForm() {
    const { isLoaderActive, runAsync } = useAsyncHandler();

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
        if (activeModal == "InputMenu"){
            fetchNodeOutputs();
        }
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
                selectedEntityType={NodeType.UnitNode}
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
                modalName={'Search by Unit'}
                open={activeModal === 'unitNodeEdgeCreate'}
                openModalType={"unitNodeAddOutputToInput"} 
            >
                {currentNodeData && (
                    <UnitNodeEdgeCreateForm/>
                )}
            </BaseModal>
        </>
    );
}
