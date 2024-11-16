import BaseModal from '../../modal/baseModal';
import {
    useGetUnitsOutputByInputLazyQuery,
    PermissionEntities,
    useDeletePermissionMutation

 } from '@rootTypes/compositionFunctions';
import { useState, useEffect } from 'react';
import useModalHandlers from '@handlers/useModalHandlers';
import { useModalStore } from '@stores/baseStore';
import { ResultType } from '@rootTypes/resultEnum';
import Spinner from '@primitives/spinner';
import ResultQuery from '@primitives/resultQuery';
import PaginationControls from '@primitives/pagination';
import UnitNodeEdgeCreateForm from '../../forms/unitNode/unitNodeEdgeCreateForm';
import useFetchEntitiesByResourceAgents from './useFetchEntitiesByResourceAgents';
import '../form.css';

interface PermissionFormProps {
    currentNodeData: any;
}

export default function PermissionForm({ currentNodeData }: PermissionFormProps) {
    const { openModal } = useModalHandlers();
    const { activeModal } = useModalStore();
    const [nodeOutputs, setNodeOutputs] = useState<Array<any> | null>(null);

    const [getUnitsOutputByInputQuery] = useGetUnitsOutputByInputLazyQuery();
    const [deletePermissionMutation] = useDeletePermissionMutation();
    const { fetchEntitiesByResourceAgents } = useFetchEntitiesByResourceAgents();

    const [selectedEntityType, setSelectedEntityType] = useState<PermissionEntities>(PermissionEntities.Repo);
    
    const [isLoaderActive, setIsLoaderActive] = useState(false);
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const fetchNodeOutputs = () => {
        setIsLoaderActive(true);
        getUnitsOutputByInputQuery({
            variables: {
                unitNodeInputUuid: currentNodeData.uuid,
                limit: itemsPerPage,
                offset: currentPage * itemsPerPage
            }
        }).then(ResultData => {
            if (ResultData.data) {
                setNodeOutputs(ResultData.data.getUnits.units);
                setTotalCount(ResultData.data.getUnits.count);
                setIsLoaderActive(false);
            }
        }).catch(error => {
            setIsLoaderActive(false);
            setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4) });
        });
    };

    useEffect(() => {
        fetchNodeOutputs();
    }, [currentNodeData, currentPage, activeModal]);

    const handleDeletePermission = (agentUuid: string, resourceUuid: string) => {
        setIsLoaderActive(true);
        setResultData({ ...resultData, message: null });
    
        if (currentNodeData) {
            deletePermissionMutation({
                variables: {
                    agentUuid: agentUuid,
                    resourceUuid: resourceUuid
                }
            }).then(result => {
                if (result.data) {
                    setIsLoaderActive(false);
                    fetchNodeOutputs();
                }
            }).catch(error => {
                setIsLoaderActive(false);
                setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4) });
            });
        }
    };

    const handleGetResources = (permissionEntities: PermissionEntities) => {
        setIsLoaderActive(true);
        setSelectedEntityType(permissionEntities)
        
        if (currentNodeData) {
            fetchEntitiesByResourceAgents(currentNodeData.uuid, permissionEntities, PermissionEntities.Repo)
                .then((result) => {
                    console.log("Fetched entities:", result);
                    setIsLoaderActive(false);

                    if (result?.data) {
                        let formattedData: Array<any> = [];
        
                        if ('getRepos' in result.data && result.data.getRepos) {
                            formattedData = result.data.getRepos.repos;
                        } else if ('getUsers' in result.data && result.data.getUsers) {
                            formattedData = result.data.getUsers.users.map((user: any) => ({
                                uuid: user.uuid,
                                name: user.login,
                                visibilityLevel: user.role + ' ' + user.status,
                            }));
                        } else if ('getUnits' in result.data && result.data.getUnits) {
                            formattedData = result.data.getUnits.units;
                        } else if ('getUnitNodes' in result.data && result.data.getUnitNodes) {
                            formattedData = result.data.getUnitNodes.unitNodes;
                        }
                        
                        console.log(formattedData)
                        setNodeOutputs(formattedData);
                    } else {
                        setNodeOutputs([]); // No data found, clear the output
                    }
                })
                .catch((error) => {
                    console.error("Error fetching resources:", error);
                    setIsLoaderActive(false);
                    setResultData({ type: ResultType.Angry, message: error.message });
                });
        }
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <>
            {isLoaderActive && <Spinner />}

            <div className="entity-type-selector">
                {Object.values(PermissionEntities).map((entityType) => (
                    <button
                        key={entityType}
                        className={`entity-button ${selectedEntityType === entityType ? 'active' : ''}`}
                        onClick={() => handleGetResources(entityType as PermissionEntities)}
                    >
                        {entityType}
                    </button>
                ))}
            </div>

            <div className="unit-list">
                {nodeOutputs ? (
                    nodeOutputs.map((unitOutput: any) => {
                        console.log('unitOutput:', unitOutput);
                        if ( unitOutput.length === 0) return null;

                        return (
                            <div key={unitOutput.uuid} className="unit-item">
                                <button
                                    className="unit-header"
                                >
                                    <h3>{unitOutput.name} {unitOutput.visibilityLevel}</h3>
                                    <button className="unit-node-del-button" onClick={() => handleDeletePermission(unitOutput.uuid, currentNodeData.uuid)}>
                                        delete
                                    </button>
                                </button>
                                
                            </div>
                        );
                    })
                ) : (
                    <p>No output nodes available.</p>
                )}
                <div className="unit-item" onClick={() => openModal('unitPermissionCreate')}>
                    <h3>Добавить доступ</h3>
                </div>
            </div>

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={() => setCurrentPage(prev => prev + 1)}
                goToPreviousPage={() => setCurrentPage(prev => prev - 1)}
            />

            <BaseModal
                modalName={'Поиск сущностей'}
                open={activeModal === 'unitPermissionCreate'}
                openModalType={"permissionMenu"} 
            >
                {currentNodeData && (
                    <UnitNodeEdgeCreateForm
                        currentNodeData={currentNodeData}
                    />
                )}
            </BaseModal>

            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}
