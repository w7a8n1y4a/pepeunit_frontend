import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useCreateRepositoryRegistryMutation, CreateRepositoryRegistryMutationVariables, GitPlatform } from '@rootTypes/compositionFunctions'
import { useState } from 'react';
import isValidString from '@utils/isValidString'
import isValidRepoUrl from '@utils/isValidRepoUrl'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import '../form.css'

import { useModalStore, useNodeStore } from '@stores/baseStore';

export default function CreateRepositoryRegistryForm() {
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { setActiveModal } = useModalStore();
    const { setCurrentNodeData } = useNodeStore();
    
    const [repositoryUrl, setRepositoryUrl] = useState('');
    const [gitPlatform, setGitPlatform] = useState(GitPlatform.Gitlab);
    const [isPrivateRepository, setIsPrivateRepository] = useState(false);
    const [repoUsername, setRepoUsername] = useState('');
    const [repoPatToken, setPatToken] = useState('');

    const [errorState, setErrorState] = useState({
        repositoryUrl: true,
        username: false,
        patToken: false
    });

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };
    
    const [createRepositoryRegistryMutation] = useCreateRepositoryRegistryMutation();

    const handleCreateRepositoryRegistry = () => {
        runAsync(async () => {
            let repoVariables: CreateRepositoryRegistryMutationVariables = {
                repositoryUrl: repositoryUrl,
                isPublicRepository: !isPrivateRepository,
                platform: gitPlatform
            }

            if (repoUsername !== '' && repoPatToken !== ''){
                repoVariables.credentials = {
                    username: repoUsername,
                    patToken: repoPatToken
                }
            }

            let result = await createRepositoryRegistryMutation({
                variables: repoVariables
            })

            if (result.data){
                let newRepositoryRegsitry = result.data.createRepositoryRegistry

                setCurrentNodeData(newRepositoryRegsitry)
                setActiveModal('RegistryMenu')
            }
        })
    };

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            <div>
                <form>
                    <DefaultInput
                        id="url_set"
                        type="text"
                        placeholder="Repo Url"
                        value={repositoryUrl}
                        validateState={repositoryUrl}
                        onChange={setRepositoryUrl}
                        validateFunc={isValidRepoUrl}
                        setIsErrorExist={(hasError) => updateErrorState('repositoryUrl', hasError)}
                    />
                    <select id='base_enum' value={gitPlatform} onChange={(e) => {
                        setGitPlatform(e.target.value as GitPlatform); 
                    }}
                    >
                        <option value={GitPlatform.Gitlab}>Gitlab</option>
                        <option value={GitPlatform.Github}>Github</option>
                    </select>

                    <div className='toggle_container'>
                        <label className="toggle">
                            <input 
                                type="checkbox" 
                                checked={isPrivateRepository}
                                onChange={(e) => { setIsPrivateRepository(e.target.checked)
                                        if (!e.target.checked) { 
                                            setErrorState(
                                                {
                                                    ...errorState,
                                                    username: false,
                                                    patToken: false
                                                }
                                            )
                                        }
                                    }
                                } 
                            />
                            <span className="slider"></span>
                        </label>
                        <div className="toggle_text">
                            Private ?
                        </div>
                    </div>
                    {
                        isPrivateRepository && (
                            <div>
                                <DefaultInput
                                    id="repo_username"
                                    type="text"
                                    placeholder="Username"
                                    value={repoUsername}
                                    validateState={repoUsername}
                                    onChange={setRepoUsername}
                                    validateFunc={isValidString}
                                    setIsErrorExist={(hasError) => updateErrorState('username', hasError)}
                                />
                                <DefaultInput
                                    id="repo_pat_token"
                                    type="password"
                                    placeholder="Pat token"
                                    value={repoPatToken}
                                    validateState={repoPatToken}
                                    onChange={setPatToken}
                                    validateFunc={isValidString}
                                    setIsErrorExist={(hasError) => updateErrorState('patToken', hasError)}
                                />
                            </div>
                        )
                    }
                </form>
            </div>
            <button className="button_main_action" onClick={handleCreateRepositoryRegistry} disabled={Object.values(errorState).some(isError => isError)}>
                Create
            </button>
        </>
    );
}