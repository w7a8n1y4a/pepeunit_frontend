import BaseModal from '../../modal/baseModal';
import {
    PermissionEntities,
    useDeletePermissionMutation,
    useGetResourceAgentsLazyQuery,
    GetUnitsWithUnitNodesQuery
 } from '@rootTypes/compositionFunctions';
import { useResultHandler } from '@rootTypes/useResultHandler';
import { useAsyncHandler } from '@rootTypes/useAsyncHandler';
import { useState, useEffect } from 'react';
import { useModalStore } from '@stores/baseStore';
import Spinner from '@primitives/spinner';
import ResultQuery from '@primitives/resultQuery';
import PaginationControls from '@primitives/pagination';
import EntityTypeSelector from '@primitives/entityTypeSelector';
import PermissionCreateForm from '../../forms/permission/permissionCreateFrom';
import useFetchEntitiesByResourceAgents from './useFetchEntitiesByResourceAgents';
import IterationList from '@primitives/iterationList'
import '../form.css';

interface PermissionFormProps {
    currentNodeData: any;
    currentNodeType: PermissionEntities;
}

export default function PermissionForm({ currentNodeData, currentNodeType }: PermissionFormProps) {
    const { resultData, handleError, handleSuccess } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

    const { activeModal } = useModalStore();
    const [nodeOutputs, setNodeOutputs] = useState<Array<any> | null>(null);
    const [ typeList, setTypeList ] = useState<'button' | 'collapse'>('button');

    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const [deletePermissionMutation] = useDeletePermissionMutation();
    const { fetchEntitiesByResourceAgents } = useFetchEntitiesByResourceAgents();
    const [getResourceAgentsLazyQuery] = useGetResourceAgentsLazyQuery();

    const [selectedEntityType, setSelectedEntityType] = useState<PermissionEntities>(PermissionEntities.User);
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const handleDeletePermission = (agentUuid: string) => {
        runAsync(async () => {
            if (currentNodeData) {
                let result = await deletePermissionMutation({
                    variables: {
                        agentUuid: agentUuid,
                        resourceUuid: currentNodeData.uuid
                    }
                })
                if (result.data) {
                    setRefreshTrigger(!refreshTrigger)
                    handleSuccess("Permission success delete")
                }
            }
        })
    };

    const loadEntities = async (entityType: PermissionEntities, page: number) => {
        if (!currentNodeData) return;

        runAsync(async () => {
            let agentUuids: string[] | null = null
            const resourceAgentsResult = await getResourceAgentsLazyQuery({
                variables: {
                    agentType: entityType,
                    resourceUuid: currentNodeData.uuid,
                    resourceType: currentNodeType
                },
            });
    
            if (resourceAgentsResult.data?.getResourceAgents?.permissions) {
                agentUuids = resourceAgentsResult.data.getResourceAgents.permissions.map(
                    (permission) => permission.agentUuid
                );
            }

            const result = await fetchEntitiesByResourceAgents(
                entityType,
                itemsPerPage,
                page * itemsPerPage,
                agentUuids
            );
            setTypeList('button')
            if (result?.data) {
                let formattedData: Array<any> = [];
                let count: number = 0;

                if ('getRepos' in result.data && result.data.getRepos) {
                    formattedData = result.data.getRepos.repos;
                    count = result.data.getRepos.count;
                } else if ('getUsers' in result.data && result.data.getUsers) {
                    formattedData = result.data.getUsers.users.map((user: any) => ({
                        uuid: user.uuid,
                        name: user.login,
                        visibilityLevel: user.role + ' ' + user.status,
                    }));
                    count = result.data.getUsers.count;
                } else if ('getUnits' in result.data && selectedEntityType == PermissionEntities.Unit) {
                    formattedData = result.data.getUnits.units;
                    count = result.data.getUnits.count
                } else if ('getUnits' in result.data && selectedEntityType == PermissionEntities.UnitNode) {
                    if (agentUuids !== null) {
                        const unitsWithUnitNodes = result.data.getUnits.units as GetUnitsWithUnitNodesQuery['getUnits']['units'];
                        result.data.getUnits.units = unitsWithUnitNodes
                          .map(unit => ({
                            ...unit,
                            unitNodes: unit.unitNodes.filter(node => agentUuids.includes(node.uuid)),
                          }))
                          .filter(unit => unit.unitNodes.length > 0);
                    }

                    const allUnits = result.data.getUnits.units;
                    const startIndex = page * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;
                    formattedData = allUnits.slice(startIndex, endIndex);

                    count = result.data.getUnits.units.length
                    setTypeList('collapse')
                }

                setNodeOutputs(formattedData);
                setTotalCount(count);
            } else {
                setNodeOutputs([]);
            }
        })
    };

    useEffect(() => {
        loadEntities(selectedEntityType, 0);
    }, [currentNodeData]);

    useEffect(() => {
        loadEntities(selectedEntityType, currentPage);
    }, [currentPage, selectedEntityType, refreshTrigger]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <>
            {isLoaderActive && <Spinner />}

            <EntityTypeSelector
                entities={[PermissionEntities.User, PermissionEntities.Unit, PermissionEntities.UnitNode]}
                selectedEntityType={selectedEntityType}
                setSelectedEntityType={setSelectedEntityType}
            />

            <IterationList
                items={nodeOutputs}
                renderType={typeList}
                handleDelete={handleDeletePermission}
                openModalName={'permissionCreate' + currentNodeType}
            />


            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={() => setCurrentPage(prev => prev + 1)}
                goToPreviousPage={() => setCurrentPage(prev => prev - 1)}
            />

            <BaseModal
                modalName={'Поиск сущностей ' + currentNodeData?.name}
                open={activeModal === 'permissionCreate' + currentNodeType}
                openModalType={"permissionMenu"  + currentNodeType} 
            >
                {currentNodeData && (
                    <PermissionCreateForm
                        currentNodeData={currentNodeData}
                        currentNodeType={currentNodeType}
                        selectedEntityType={selectedEntityType}
                        setSelectedEntityType={setSelectedEntityType}
                    />
                )}
            </BaseModal>

            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}
