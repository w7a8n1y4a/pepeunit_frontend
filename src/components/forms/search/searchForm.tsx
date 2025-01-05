import {
    PermissionEntities,
    VisibilityLevel
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
import VisibilitySelector from '@primitives/visibilitySelector';
import useFetchEntitiesByFilter from '../utils/useFetchEntitiesByFilter';
import '../form.css';
import { useNodeStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';

  
  interface SearchFormProps {
    onFocusNode?: (uuid: string, nodeType: string) => void
  }

  export default function SearchForm({ onFocusNode }: SearchFormProps){
    const { resultData, setResultData, handleError } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);
  
    const [selectedEntityType, setSelectedEntityType] = useState<PermissionEntities>(PermissionEntities.Unit);
    const [selectedVisibilityLevels, setSelectedVisibilityLevels] = useState<VisibilityLevel[]>(
        [VisibilityLevel.Public, VisibilityLevel.Internal, VisibilityLevel.Private]
    );
  
    const { currentNodeData } = useNodeStore();
    const { user } = useUserStore();
    
    const [ searchString, setSearchString ] = useState('');
    const [ isCreatorSearchOnly, setIsCreatorSearchOnly] = useState<boolean>(false);
    const [nodeOutputs, setNodeOutputs] = useState<Array<any> | null>(null);

    const { fetchEntitiesByFilter } = useFetchEntitiesByFilter();
  
    const [errorState, setErrorState] = useState({
        searchString: false,
    });
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;
  
    const loadEntities = async (
        searchString: string,
        selectedEntityType: PermissionEntities,
        currentPage: number,
        visibilityLevel?: VisibilityLevel[], 
        isCreatorSearchOnly?: boolean,
    ) => {
        runAsync(async () => {
            let result = await fetchEntitiesByFilter(
                searchString,
                selectedEntityType,
                itemsPerPage,
                currentPage * itemsPerPage,
                visibilityLevel,
                user && isCreatorSearchOnly ? user.uuid : undefined  
            )
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
        loadEntities('', selectedEntityType, currentPage, selectedVisibilityLevels, isCreatorSearchOnly);
    }, [currentNodeData]);
    
    useEffect(() => {
        loadEntities(searchString, selectedEntityType, currentPage, selectedVisibilityLevels, isCreatorSearchOnly);
    }, [searchString, currentPage, selectedEntityType, selectedVisibilityLevels, isCreatorSearchOnly]);

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
            {
                user && selectedEntityType != PermissionEntities.User && (
                    <div className='toggle_container'>
                        <label className="toggle">
                            <input 
                                type="checkbox" 
                                checked={isCreatorSearchOnly}
                                onChange={(e) => { setIsCreatorSearchOnly(e.target.checked)}
                                } 
                            />
                            <span className="slider"></span>
                        </label>
                        <div className="toggle_text">
                            Только свои ?
                        </div>
                    </div>
                )
            }
        </form>
        {
            user && selectedEntityType != PermissionEntities.User && (
                <VisibilitySelector
                    levels={[VisibilityLevel.Public, VisibilityLevel.Internal, VisibilityLevel.Private]}
                    selectedVisibilityLevels={selectedVisibilityLevels}
                    setSelectedVisibilityLevels={setSelectedVisibilityLevels}
                />
            )
        }

        <EntityTypeSelector
            entities={
                user
                ? [PermissionEntities.Unit, PermissionEntities.Repo, PermissionEntities.User]
                : [PermissionEntities.Unit, PermissionEntities.Repo]
            }
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
  