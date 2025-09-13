import BaseModal from '../../modal/baseModal';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetDashboardPanelsLazyQuery, useDeletePanelMutation } from '@rootTypes/compositionFunctions';
import { useState, useEffect } from 'react';
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
    const [dashboardPanels, setDashboardPanels] = useState<Array<any> | null>(null);
    const [getDashboardPanelsQuery] = useGetDashboardPanelsLazyQuery();
    const [deletePanelMutation] = useDeletePanelMutation();
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
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
                setTotalCount(result.data.getDashboardPanels.count);
            }
        })
    };

    useEffect(() => {
        if (activeModal == "panelManagment"){
            fetchNodeOutputs();
        }
    }, [currentNodeData, currentPage, activeModal]);

    const handleDeletePanel = (uuid: string) => {
        runAsync(async () => {
            if (currentNodeData) {
                let result = await deletePanelMutation({
                    variables: {
                        uuid: uuid
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
                items={dashboardPanels}
                renderType={'button'}
                selectedEntityType={NodeType.DashboardPanel}
                handleDelete={handleDeletePanel}
                openModalName={'createDashboardPanel'}
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
                openModalType={"DashboardMenu"} 
            >
                {currentNodeData && (
                    <UnitNodeEdgeCreateForm/>
                )}
            </BaseModal>
        </>
    );
}
