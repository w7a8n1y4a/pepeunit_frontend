import BaseModal from '../../modal/baseModal';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetDashboardPanelsLazyQuery, useDeletePanelMutation } from '@rootTypes/compositionFunctions';
import { useState, useEffect, useMemo } from 'react';
import { useModalStore } from '@stores/baseStore';
import Spinner from '@primitives/spinner';
import PaginationControls from '@primitives/pagination';
import IterationList from '@primitives/iterationList'
import UnitNodeEdgeCreateForm from '../../forms/unitNode/unitNodeEdgeCreateForm';
import '../form.css';

import { useNodeStore } from '@stores/baseStore';
import { NodeType } from '@src/rootTypes/nodeTypeEnum';

export default function DashboardPanelsForm() {
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { currentNodeData } = useNodeStore();
    const { activeModal } = useModalStore();

    const [dashboardPanels, setDashboardPanels] = useState<Array<any>>([]);
    const [getDashboardPanelsQuery] = useGetDashboardPanelsLazyQuery();
    const [deletePanelMutation] = useDeletePanelMutation();
    
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const fetchNodeOutputs = () => {
        runAsync(async () => {
            let result = await getDashboardPanelsQuery({
                variables: {
                    uuid: currentNodeData.uuid
                }
            })
            if (result.data) {
                setDashboardPanels(result.data.getDashboardPanels.panels);
            }
        })
    };

    useEffect(() => {
        if (activeModal == "panelManagment"){
            fetchNodeOutputs();
        }
    }, [currentNodeData, activeModal]);

    const handleDeletePanel = (uuid: string) => {
        runAsync(async () => {
            if (currentNodeData) {
                let result = await deletePanelMutation({
                    variables: { uuid }
                })
                if (result.data) {
                    fetchNodeOutputs();
                }
            }
        })
    };

    // отрезаем по текущей странице
    const paginatedPanels = useMemo(() => {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        return dashboardPanels.slice(start, end);
    }, [dashboardPanels, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(dashboardPanels.length / itemsPerPage);

    return (
        <>
            {isLoaderActive && <Spinner />}

            <IterationList
                items={paginatedPanels}
                renderType={'button'}
                selectedEntityType={NodeType.DashboardPanel}
                handleDelete={handleDeletePanel}
                openModalName={'createDashboardPanel'}
            />

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                goToPreviousPage={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
            />

            <BaseModal
                modalName={'Search by Unit'}
                open={activeModal === 'unitNodeEdgeCreate'}
                openModalType={"DashboardMenu"} 
            >
                {currentNodeData && (
                    <UnitNodeEdgeCreateForm/>
                )}
            </BaseModal>
        </>
    );
}
