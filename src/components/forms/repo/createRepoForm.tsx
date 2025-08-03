import { NodeType } from '@rootTypes/nodeTypeEnum'
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { getNodeColor } from '@utils/getNodeColor'
import { useCreateRepoMutation, VisibilityLevel, CreateRepoMutationVariables } from '@rootTypes/compositionFunctions'
import { useState } from 'react';
import isValidLogin from '@utils/isValidLogin'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import {registryToText} from '@utils/registryToText'
import '../form.css'

import { useGraphStore } from '@stores/graphStore';
import { useModalStore, useNodeStore, usePickRegistryStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers'; 

import { useErrorStore } from '@stores/errorStore';

export default function CreateRepoForm() {
    const { isLoaderActive, runAsync } = useAsyncHandler();
    const { setAngry } = useErrorStore();
    const { setActiveModal } = useModalStore();
    const { setCurrentNodeData } = useNodeStore();
    const { openModal } = useModalHandlers();
    
    const [repoName, setRepoName] = useState('');
    const [defaultBranch, setDefaultBranch] = useState<string | null>(null);
    const [repoVisibilityLevel, setRepoVisibilityLevel] = useState(VisibilityLevel.Public);
    const [isCompilableRepository, setIsCompilableRepository] = useState(false);
    const { currentPickRegistryData } = usePickRegistryStore();

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
        if (currentPickRegistryData && defaultBranch) {
            runAsync(async () => {
                let repoVariables: CreateRepoMutationVariables = {
                    repositoryRegistryUuid: currentPickRegistryData.uuid,
                    defaultBranch: defaultBranch,
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
        } else {
            runAsync(async () => {
                setAngry('Fill in the default branch')
            })
        }
    };

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            <div>
                <button className="button_registry_search" onClick={() => openModal('registrySearch')}>
                    {
                        currentPickRegistryData ? (
                            registryToText(currentPickRegistryData.repositoryUrl)
                        )
                        : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="20" height="20">
                                    <path d="M11 4a7 7 0 1 1 0 14a7 7 0 0 1 0-14zm0-2a9 9 0 1 0 6.219 15.546l4.396 4.395l1.414-1.414l-4.395-4.396A9 9 0 0 0 11 2z" fill="currentColor"/>
                                </svg>
                                Search in Registry Repositories
                            </>
                        )
                    }
                </button>
                <form>
                    <select id='base_enum' onChange={(e) => {
                            setDefaultBranch(e.target.value)
                        }}
                    >
                        <option value="" disabled selected>Pick branch</option>

                        {   
                            currentPickRegistryData && currentPickRegistryData.branches.map(
                                (item: string) => (
                                    <option value={item}>
                                        {item}
                                    </option>
                                )
                            )
                        }
                    </select>
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