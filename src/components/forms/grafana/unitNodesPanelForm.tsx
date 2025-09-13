import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetDashboardPanelsLazyQuery, useDeleteLinkMutation } from '@rootTypes/compositionFunctions';
import UnitNodeEdgeCreateForm from '../../forms/unitNode/unitNodeEdgeCreateForm';
import { useState, useEffect, useMemo } from 'react';
import { useModalStore } from '@stores/baseStore';
import BaseModal from '../../modal/baseModal';
import Spinner from '@primitives/spinner';
import PaginationControls from '@primitives/pagination';
import IterationList from '@primitives/iterationList'
import '../form.css';

import { useNodeStore, useDashboardPanelStore } from '@stores/baseStore';
import { NodeType } from '@src/rootTypes/nodeTypeEnum';

export default function UnitNodesPanelForm() {
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { currentNodeData } = useNodeStore();
    const { currentDashboardPanelData } = useDashboardPanelStore();
    const { activeModal } = useModalStore();

    const [unitNodesPanel, setUnitNodesPanel] = useState<Array<any>>([]);
    const [getDashboardPanelsQuery] = useGetDashboardPanelsLazyQuery();
    const [deleteLinkMutation] = useDeleteLinkMutation();
    
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const fetchNodeOutputs = () => {
        runAsync(async () => {
            let result = await getDashboardPanelsQuery({
                variables: {
                    uuid: currentNodeData.uuid
                }
            });
            if (result.data) {
                const panels = result.data.getDashboardPanels.panels;

                const matchedPanel = panels.find(
                    (panel: any) => panel.uuid === currentDashboardPanelData?.uuid
                );

                if (matchedPanel) {
                    setUnitNodesPanel(matchedPanel.unitNodesForPanel);
                }
            }
        });
    };

    useEffect(() => {
        if (activeModal == "unitNodesPanel"){
            fetchNodeOutputs();
        }
    }, [currentNodeData, currentDashboardPanelData, activeModal]);

    const handleDeleteLink = (unitNodeUuid: string) => {
        runAsync(async () => {
            if (currentDashboardPanelData) {
                let result = await deleteLinkMutation({
                    variables: {
                        dashboardPanelUuid: currentDashboardPanelData.uuid,
                        unitNodeUuid: unitNodeUuid
                    }
                })
                if (result.data) {
                    fetchNodeOutputs();
                }
            }
        })
    };

    const paginatedPanels = useMemo(() => {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        return unitNodesPanel.slice(start, end);
    }, [unitNodesPanel, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(unitNodesPanel.length / itemsPerPage);

    return (
        <>
            {isLoaderActive && <Spinner />}

            <IterationList
                items={paginatedPanels}
                renderType={'button'}
                selectedEntityType={NodeType.DashboardUnitNode}
                handleDelete={handleDeleteLink}
                openModalName={'unitNodesPanel'}
            />

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                goToPreviousPage={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
            />
            <BaseModal
                modalName={'Search by Unit'}
                open={activeModal === 'unitNodeLinkCreate'}
                openModalType={"unitNodesPanel"} 
            >
                {currentNodeData && currentDashboardPanelData && (
                    <UnitNodeEdgeCreateForm/>
                )}
            </BaseModal>
        </>
    );
}
