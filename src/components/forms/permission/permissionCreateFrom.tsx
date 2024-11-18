import {
    PermissionEntities,
    useCreatePermissionMutation

 } from '@rootTypes/compositionFunctions';
import { useState, useEffect } from 'react';
import { ResultType } from '@rootTypes/resultEnum';
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner';
import ResultQuery from '@primitives/resultQuery';
import PaginationControls from '@primitives/pagination';
import PermissionList from './permissionList';
import useFetchEntitiesByFilter from './useFetchEntitiesByFilter';
import '../form.css';

interface PermissionCreateFormProps {
    currentNodeData: any;
    currentNodeType: PermissionEntities;
    selectedEntityType: PermissionEntities;
    setSelectedEntityType: (show: PermissionEntities) => void;
}

export default function PermissionCreateForm({ currentNodeData, currentNodeType, selectedEntityType, setSelectedEntityType }: PermissionCreateFormProps) {
    const [ searchString, setSearchString ] = useState('');
    const [nodeOutputs, setNodeOutputs] = useState<Array<any> | null>(null);

    const [createPermissionMutation] = useCreatePermissionMutation();
    const { fetchEntitiesByFilter } = useFetchEntitiesByFilter();

    const [errorState, setErrorState] = useState({
        searchString: false,
    });
    const [isLoaderActive, setIsLoaderActive] = useState(false);
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const loadEntities = async (searchString: string, selectedEntityType: PermissionEntities, currentPage: number) => {
        setIsLoaderActive(true)
        fetchEntitiesByFilter(searchString, selectedEntityType, itemsPerPage, currentPage * itemsPerPage)
            .then(result => {
                setIsLoaderActive(false);

                if (result?.data) {
                    let formattedData: Array<any> = [];
                    let count: number = 0;

                    if ('getRepos' in result.data && result.data.getRepos) {
                        formattedData = result.data.getRepos.repos;
                        count = result.data.getRepos.count
                    } else if ('getUsers' in result.data && result.data.getUsers) {
                        formattedData = result.data.getUsers.users.map((user: any) => ({
                            uuid: user.uuid,
                            name: user.login,
                            visibilityLevel: user.role + ' ' + user.status,
                        }));
                        count = result.data.getUsers.count
                    } else if ('getUnits' in result.data && result.data.getUnits) {
                        formattedData = result.data.getUnits.units;
                        count = result.data.getUnits.count
                    } else if ('getUnitNodes' in result.data && result.data.getUnitNodes) {
                        formattedData = result.data.getUnitNodes.unitNodes.map((unitNode: any) => ({
                            uuid: unitNode.uuid,
                            name: unitNode.topicName,
                            visibilityLevel: unitNode.visibilityLevel + ' ' + unitNode.state,
                        }));;
                        count = result.data.getUnitNodes.count
                    }
                    
                    setNodeOutputs(formattedData);
                    setTotalCount(count);
                } else {
                    setNodeOutputs([]); // No data found, clear the output
                }
            }
        )
    };

    useEffect(() => {
        loadEntities('', selectedEntityType, currentPage);
    }, [currentNodeData]);

    useEffect(() => {
        loadEntities(searchString, selectedEntityType, currentPage);
    }, [searchString, currentPage, selectedEntityType]);

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };

    const handleCreatePermission = (entityUuid: string) => {
        setIsLoaderActive(true)
        setResultData({
            ...resultData,
            message: null
        })

        createPermissionMutation({
            variables: {
                agentUuid: entityUuid,
                agentType: selectedEntityType,
                resourceUuid: currentNodeData.uuid,
                resourceType: currentNodeType
            }
        }).then(ResultData =>{
            if (ResultData.data){
                setIsLoaderActive(false)
                setResultData({ type: ResultType.Happy, message: "Permission создан"})
            }
        }).catch(error => {
            setIsLoaderActive(false)
            setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
        })
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <>
            {isLoaderActive && <Spinner />}

            <form>
                <DefaultInput
                    id="name_set"
                    type="text"
                    placeholder="Search name"
                    value={searchString}
                    validateState={searchString}
                    onChange={setSearchString}
                    validateFunc={() => (null)}
                    setIsErrorExist={(hasError) => updateErrorState('searchString', hasError)}
                    setResultData={setResultData}
                />
            </form>

            <div className="entity-type-selector">
                {Object.values(PermissionEntities).map((entityType) => (
                    <button
                        key={entityType}
                        className={`entity-button ${selectedEntityType === entityType ? 'active' : ''}`}
                        onClick={() => setSelectedEntityType(entityType as PermissionEntities)}
                    >
                        {entityType}
                    </button>
                ))}
            </div>

            <PermissionList
                nodeOutputs={nodeOutputs}
                currentNodeData={currentNodeData}
                currentNodeType={currentNodeType}
                handleCreatePermission={handleCreatePermission}
            />

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                goToNextPage={() => setCurrentPage(prev => prev + 1)}
                goToPreviousPage={() => setCurrentPage(prev => prev - 1)}
            />

            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}
