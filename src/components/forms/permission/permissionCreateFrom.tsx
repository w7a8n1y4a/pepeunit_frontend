import {
    PermissionEntities,
    useCreatePermissionMutation

 } from '@rootTypes/compositionFunctions';
import { useResultHandler } from '@rootTypes/useResultHandler';
import { useAsyncHandler } from '@rootTypes/useAsyncHandler';
import { useState, useEffect } from 'react';
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner';
import ResultQuery from '@primitives/resultQuery';
import PaginationControls from '@primitives/pagination';
import IterationList from '@primitives/iterationList'
import EntityTypeSelector from '@primitives/entityTypeSelector';
import useFetchEntitiesByFilter from './useFetchEntitiesByFilter';
import '../form.css';

import { useNodeStore } from '@stores/baseStore';


interface PermissionCreateFormProps {
    currentNodeType: PermissionEntities;
    selectedEntityType: PermissionEntities;
    setSelectedEntityType: (show: PermissionEntities) => void;
}

export default function PermissionCreateForm({ currentNodeType, selectedEntityType, setSelectedEntityType }: PermissionCreateFormProps) {
    const { resultData, setResultData, handleError, handleSuccess } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

    const { currentNodeData } = useNodeStore();
    
    const [ searchString, setSearchString ] = useState('');
    const [ typeList, setTypeList ] = useState<'button' | 'collapse'>('button');
    const [nodeOutputs, setNodeOutputs] = useState<Array<any> | null>(null);

    const [createPermissionMutation] = useCreatePermissionMutation();
    const { fetchEntitiesByFilter } = useFetchEntitiesByFilter();

    const [errorState, setErrorState] = useState({
        searchString: false,
    });
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const loadEntities = async (searchString: string, selectedEntityType: PermissionEntities, currentPage: number) => {
        runAsync(async () => {
            let result = await fetchEntitiesByFilter(searchString, selectedEntityType, itemsPerPage, currentPage * itemsPerPage)
            if (result?.data) {
                let formattedData: Array<any> = [];
                let count: number = 0;
                setTypeList('button')
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
                } else if ('getUnits' in result.data && selectedEntityType == PermissionEntities.Unit) {
                    formattedData = result.data.getUnits.units;
                    count = result.data.getUnits.count
                } else if ('getUnits' in result.data && selectedEntityType == PermissionEntities.UnitNode) {
                    formattedData = result.data.getUnits.units;
                    count = result.data.getUnits.count
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
        runAsync(async () => {
            let result = await createPermissionMutation({
                variables: {
                    agentUuid: entityUuid,
                    agentType: selectedEntityType,
                    resourceUuid: currentNodeData.uuid,
                    resourceType: currentNodeType
                }
            })
            if (result.data){
                handleSuccess("Permission success create")
            }
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

            <EntityTypeSelector
                entities={[PermissionEntities.User, PermissionEntities.Unit, PermissionEntities.UnitNode]}
                selectedEntityType={selectedEntityType}
                setSelectedEntityType={setSelectedEntityType}
            />

            <IterationList
                items={nodeOutputs}
                renderType={typeList}
                handleCreate={handleCreatePermission}
                openModalName={null}
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
