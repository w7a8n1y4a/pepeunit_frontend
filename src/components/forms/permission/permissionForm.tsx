import BaseModal from '../../modal/baseModal';
import {
    useDeletePermissionMutation,
    useGetResourceAgentsLazyQuery,
    GetUnitsWithUnitNodesQuery
 } from '@rootTypes/compositionFunctions';
import { convertNodeTypeToPermissionEntity } from '@utils/mappersNodeTypeToPermissions';
import { NodeType } from '@rootTypes/nodeTypeEnum'
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useState, useEffect } from 'react';
import { useModalStore } from '@stores/baseStore';
import Spinner from '@primitives/spinner';
import PaginationControls from '@primitives/pagination';
import EntityTypeSelector from '@primitives/entityTypeSelector';
import PermissionCreateForm from '../../forms/permission/permissionCreateFrom';
import useFetchEntitiesByResourceAgents from '../utils/useFetchEntitiesByResourceAgents';
import IterationList from '@primitives/iterationList'
import '../form.css';

import { useNodeStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';


interface PermissionFormProps {
    currentNodeType: NodeType;
}

export default function PermissionForm({ currentNodeType }: PermissionFormProps) {
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { currentNodeData } = useNodeStore();

    const { activeModal } = useModalStore();
    const [nodeOutputs, setNodeOutputs] = useState<Array<any> | null>(null);
    const [ typeList, setTypeList ] = useState<'button' | 'collapse'>('button');

    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const [deletePermissionMutation] = useDeletePermissionMutation();
    const { fetchEntitiesByResourceAgents } = useFetchEntitiesByResourceAgents();
    const [getResourceAgentsLazyQuery] = useGetResourceAgentsLazyQuery();

    const [selectedEntityType, setSelectedEntityType] = useState<NodeType>(NodeType.User);
    
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
                    setHappy("Permission success delete")
                }
            }
        })
    };

    const loadEntities = async (entityType: NodeType, page: number) => {
        if (!currentNodeData) return;

        runAsync(async () => {
            let agentUuids: string[] | null = null
            console.log(currentNodeData.uuid, convertNodeTypeToPermissionEntity(entityType),  currentNodeData.__typename, convertNodeTypeToPermissionEntity(currentNodeType))
            const resourceAgentsResult = await getResourceAgentsLazyQuery({
                variables: {
                    agentType: convertNodeTypeToPermissionEntity(entityType),
                    resourceUuid: currentNodeData.uuid,
                    resourceType: convertNodeTypeToPermissionEntity(currentNodeType)
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

                if ('getUsers' in result.data && result.data.getUsers) {
                    formattedData = result.data.getUsers.users;
                    count = result.data.getUsers.count;
                } else if ('getUnits' in result.data && selectedEntityType == NodeType.Unit) {
                    formattedData = result.data.getUnits.units;
                    count = result.data.getUnits.count
                } else if ('getUnits' in result.data && selectedEntityType == NodeType.UnitNode) {
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
        if (currentNodeData.__typename != "RepositoryRegistryType"){
            loadEntities(selectedEntityType, 0);
        }
    }, [currentNodeData]);

    useEffect(() => {
        if (selectedEntityType != NodeType.Registry && activeModal?.slice(0, 14) == 'permissionMenu'){
            loadEntities(selectedEntityType, currentPage);
        }
    }, [currentPage, selectedEntityType, refreshTrigger, activeModal]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <>
            {isLoaderActive && <Spinner />}

            <EntityTypeSelector
                entities={[NodeType.User, NodeType.Unit]}
                selectedEntityType={selectedEntityType}
                setSelectedEntityType={setSelectedEntityType}
            />

            <IterationList
                items={nodeOutputs}
                renderType={typeList}
                selectedEntityType={selectedEntityType}
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
                modalName={'Pick Agent'}
                subName={currentNodeData?.name}
                open={activeModal === 'permissionCreate' + currentNodeType}
                openModalType={"permissionMenu"  + currentNodeType} 
            >
                {currentNodeData && (
                    <PermissionCreateForm
                        currentNodeType={currentNodeType}
                        selectedEntityType={selectedEntityType}
                        setSelectedEntityType={setSelectedEntityType}
                    />
                )}
            </BaseModal>
        </>
    );
}
