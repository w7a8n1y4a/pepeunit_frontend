import BaseModal from '../../modal/baseModal';
import {
    PermissionEntities,
    useDeletePermissionMutation,
    useGetResourceAgentsLazyQuery,
    GetUnitsWithUnitNodesQuery
 } from '@rootTypes/compositionFunctions';
import { useState, useEffect } from 'react';
import { useModalStore } from '@stores/baseStore';
import { ResultType } from '@rootTypes/resultEnum';
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
    const { activeModal } = useModalStore();
    const [nodeOutputs, setNodeOutputs] = useState<Array<any> | null>(null);
    const [ typeList, setTypeList ] = useState<'button' | 'collapse'>('button');

    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const [deletePermissionMutation] = useDeletePermissionMutation();
    const { fetchEntitiesByResourceAgents } = useFetchEntitiesByResourceAgents();
    const [getResourceAgentsLazyQuery] = useGetResourceAgentsLazyQuery();

    const [selectedEntityType, setSelectedEntityType] = useState<PermissionEntities>(PermissionEntities.User);
    
    const [isLoaderActive, setIsLoaderActive] = useState(false);
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const handleDeletePermission = (agentUuid: string) => {
        setIsLoaderActive(true);
        setResultData({ ...resultData, message: null });
    
        if (currentNodeData) {
            deletePermissionMutation({
                variables: {
                    agentUuid: agentUuid,
                    resourceUuid: currentNodeData.uuid
                }
            }).then(result => {
                if (result.data) {
                    setIsLoaderActive(false);
                    setRefreshTrigger(!refreshTrigger)
                }
            }).catch(error => {
                setIsLoaderActive(false);
                setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4) });
            });
        }
    };

    const loadEntities = async (entityType: PermissionEntities, page: number) => {
        if (!currentNodeData) return;

        setIsLoaderActive(true);
        try {
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
                          .filter(unit => unit.unitNodes.length > 0); // Удаляем units с пустыми unitNodes
                    } else {
                        result.data.getUnits.units
                    }

                    formattedData = result.data.getUnits.units;
                    count = result.data.getUnits.units.length
                    setTypeList('collapse')
                }

                setNodeOutputs(formattedData);
                setTotalCount(count);
            } else {
                setNodeOutputs([]);
            }
        } catch (error: any) {
            setResultData({ type: ResultType.Angry, message: error.message });
        } finally {
            setIsLoaderActive(false);
        }
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
