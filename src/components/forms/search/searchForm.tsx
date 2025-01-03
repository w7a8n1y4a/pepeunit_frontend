import {
    PermissionEntities
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
import useFetchEntitiesByFilter from '../utils/useFetchEntitiesByFilter';
import '../form.css';
import { useNodeStore } from '@stores/baseStore';

  
  interface SearchFormProps {
    onFocusNode?: (uuid: string, nodeType: string) => void
  }
  

  export default function SearchForm({ onFocusNode }: SearchFormProps){
    const { resultData, setResultData, handleError } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);
  
    const [selectedEntityType, setSelectedEntityType] = useState<PermissionEntities>(PermissionEntities.Unit);
  
    const { currentNodeData } = useNodeStore();
    
    const [ searchString, setSearchString ] = useState('');
    const [nodeOutputs, setNodeOutputs] = useState<Array<any> | null>(null);
  
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
                if ('getRepos' in result.data && result.data.getRepos) {
                    formattedData = result.data.getRepos.repos;
                    count = result.data.getRepos.count
                } else if ('getUsers' in result.data && result.data.getUsers) {
                    formattedData = result.data.getUsers.users.map((user: any) => ({
                        uuid: user.uuid,
                        name: user.login,
                        visibilityLevel: user.role + ' ' + user.status,
                        __typename: 'UserType'
                    }));
                    count = result.data.getUsers.count
                } else if ('getUnits' in result.data && selectedEntityType == PermissionEntities.Unit) {
                    formattedData = result.data.getUnits.units;
                    count = result.data.getUnits.count
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
  
    const totalPages = Math.ceil(totalCount / itemsPerPage);
  
    return (
      <>
        {isLoaderActive && <Spinner />}

        <form>
            <DefaultInput
                id="name_set"
                type="text"
                placeholder="Search"
                value={searchString}
                validateState={searchString}
                onChange={setSearchString}
                validateFunc={() => (null)}
                setIsErrorExist={(hasError) => updateErrorState('searchString', hasError)}
                setResultData={setResultData}
            />
        </form>

        <EntityTypeSelector
            entities={[PermissionEntities.Unit, PermissionEntities.Repo, PermissionEntities.User]}
            selectedEntityType={selectedEntityType}
            setSelectedEntityType={setSelectedEntityType}
        />

        <IterationList
            items={nodeOutputs}
            renderType={'button'}
            openModalName={null}
            onFocusNode={onFocusNode}
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
    )
  }
  