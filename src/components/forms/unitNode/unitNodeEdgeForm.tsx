import BaseModal from '../../modal/baseModal';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetUnitsOutputByInputLazyQuery, useDeleteUnitNodeEdgeMutation, useCreateUnitNodeEdgeMutation, UnitNodeTypeEnum } from '@rootTypes/compositionFunctions';
import { useState, useEffect } from 'react';
import { useModalStore } from '@stores/baseStore';
import Spinner from '@primitives/spinner';
import PaginationControls from '@primitives/pagination';
import IterationList from '@primitives/iterationList'
import UnitNodeEdgeCreateForm from '../../forms/unitNode/unitNodeEdgeCreateForm';
import { useErrorStore } from '@stores/errorStore';
import '../form.css';

import { useNodeStore } from '@stores/baseStore';
import { NodeType } from '@src/rootTypes/nodeTypeEnum';

export default function UnitNodeEdgeForm() {
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { currentNodeData } = useNodeStore();

    const { activeModal } = useModalStore();
    const [nodeOutputs, setNodeOutputs] = useState<Array<any> | null>(null);
    const [getUnitsOutputByInputQuery] = useGetUnitsOutputByInputLazyQuery();
    const [createUnitNodeEdgeMutation] = useCreateUnitNodeEdgeMutation();
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
        if (activeModal == "unitNodeAddOutputToInput"){
            fetchNodeOutputs();
        }
    }, [currentNodeData, currentPage, activeModal]);

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
                    <UnitNodeEdgeCreateForm
                        availableUnitNodeType={[UnitNodeTypeEnum.Output]}
                        handleCreateConnection={handleCreateEdge}
                    />
                )}
            </BaseModal>
        </>
    );
}
