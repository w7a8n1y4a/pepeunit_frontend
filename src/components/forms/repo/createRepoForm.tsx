import { NodeType } from '@rootTypes/nodeTypeEnum'
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { getNodeColor } from '@utils/getNodeColor'
import { useCreateRepoMutation, VisibilityLevel, CreateRepoMutationVariables } from '@rootTypes/compositionFunctions'
import { useState } from 'react';
import isValidLogin from '@utils/isValidLogin'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import '../form.css'

import { useGraphStore } from '@stores/graphStore';
import { useModalStore, useNodeStore } from '@stores/baseStore';    

export default function CreateRepoForm() {
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { setActiveModal } = useModalStore();
    const { setCurrentNodeData } = useNodeStore();
    
    const [repoName, setRepoName] = useState('');
    const [repoVisibilityLevel, setRepoVisibilityLevel] = useState(VisibilityLevel.Public);
    const [isCompilableRepository, setIsCompilableRepository] = useState(false);
    const [targetRepositoryRegistry, setTargetRepositoryRegistry] = useState<string | null>(null);

    const { graphData, setGraphData } = useGraphStore();

    const [errorState, setErrorState] = useState({
        name: true,
        username: false,
        patToken: false
    });

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };
    
    const [createRepoMutation] = useCreateRepoMutation();

    const handleCreateRepo = () => {
        // TODO: del
        setTargetRepositoryRegistry(null)
        if (targetRepositoryRegistry) {
            runAsync(async () => {
                let repoVariables: CreateRepoMutationVariables = {
                    repositoryRegistryUuid: targetRepositoryRegistry,
                    visibilityLevel: repoVisibilityLevel,
                    name: repoName,
                    isCompilableRepo: isCompilableRepository,
                }

                let result = await createRepoMutation({
                    variables: repoVariables
                })

                if (result.data){
                    let newRepo = result.data.createRepo

                    const newNode = {
                        id: newRepo.uuid,
                        type: NodeType.Repo,
                        color: getNodeColor(NodeType.Repo),
                        data: newRepo
                    };
                
                    const newLink = {
                        source: import.meta.env.VITE_INSTANCE_NAME || window.env.VITE_INSTANCE_NAME,
                        target: newRepo.uuid,
                        value: 1
                    };

                    setGraphData({
                        nodes: [...graphData.nodes, newNode],
                        links: [...graphData.links, newLink],
                    });
                    setCurrentNodeData(newRepo)
                    setActiveModal('updateRepo')
                }
            })
        }
    };

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            <div>
                <form>
                    <DefaultInput
                        id="name_set"
                        type="text"
                        placeholder="Name"
                        value={repoName}
                        validateState={repoName}
                        onChange={setRepoName}
                        validateFunc={isValidLogin}
                        setIsErrorExist={(hasError) => updateErrorState('name', hasError)}
                    />
                    <select id='base_enum' value={repoVisibilityLevel} onChange={(e) => {
                        setRepoVisibilityLevel(e.target.value as VisibilityLevel); 
                    }}
                    >
                        <option value={VisibilityLevel.Public}>Public</option>
                        <option value={VisibilityLevel.Internal}>Internal</option>
                        <option value={VisibilityLevel.Private}>Private</option>
                    </select>

                    <div className='toggle_container'>
                        <label className="toggle">
                            <input 
                                type="checkbox" 
                                checked={isCompilableRepository}
                                onChange={(e) => { setIsCompilableRepository(e.target.checked)}
                                } 
                            />
                            <span className="slider"></span>
                        </label>
                        <div className="toggle_text">
                            Compilable ?
                        </div>
                    </div>
                </form>
            </div>
            <button className="button_main_action" onClick={handleCreateRepo} disabled={Object.values(errorState).some(isError => isError)}>
                Create
            </button>
        </>
    );
}