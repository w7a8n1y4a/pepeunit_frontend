import { ResultType } from '../../../types/resultEnum'
import { useCreateRepoMutation, VisibilityLevel, CreateRepoMutationVariables, RepoType } from '../../../types/composition-functions'
import { useState } from 'react';
import isValidLogin from '../../../utils/isValidLogin'
import isValidString from '../../../utils/isValidString'
import isValidRepoUrl from '../../../utils/isValidRepoUrl'
import DefaultInput from '../primitives/DefaultInput'
import Spinner from '../primitives/Spinner'
import ResultQuery from '../primitives/ResultQuery'
import '../form.css'


interface CreateRepoFormProps {
    setActiveModal: (show: string | null) => void
    setCurrentRepoData: (repo: RepoType | null) => void;
}

export default function CreateRepoForm({ setActiveModal, setCurrentRepoData }:CreateRepoFormProps) {
    const [repoName, setRepoName] = useState('');
    const [repoUrl, setRepoUrl] = useState('');
    const [repoVisibilityLevel, setRepoVisibilityLevel] = useState(VisibilityLevel.Public);
    const [isPrivateRepository, setIsPrivateRepository] = useState(false);
    const [repoUsername, setRepoUsername] = useState('');
    const [repoPatToken, setPatToken] = useState('');

    const [errorState, setErrorState] = useState({
        name: true,
        repoUrl: true,
        username: false,
        patToken: false
    });
    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };
    
    const [createRepoMutation] = useCreateRepoMutation();

    const handleCreateRepo = () => {
        setIsLoaderActive(true)
        setResultData({
            ...resultData,
            message: null
        })

        let repoVariables: CreateRepoMutationVariables = {
            visibilityLevel: repoVisibilityLevel,
            name: repoName,
            repoUrl: repoUrl,
            isPublicRepository: !isPrivateRepository
        }

        if (repoUsername !== '' && repoPatToken !== ''){
            repoVariables.credentials = {
                username: repoUsername,
                patToken: repoPatToken
            }
        }

        createRepoMutation({
            variables: repoVariables
        }).then(CreateRepoData =>{
            if (CreateRepoData.data){
                console.log('Repo создан', CreateRepoData.data)
                setCurrentRepoData(CreateRepoData.data.createRepo)
                setActiveModal('updateRepo')
                setIsLoaderActive(false)
            }
        }).catch(error => {
            setIsLoaderActive(false)
            setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
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
                        id="name_set"
                        type="text"
                        placeholder="Name"
                        value={repoName}
                        validateState={repoName}
                        onChange={setRepoName}
                        validateFunc={isValidLogin}
                        setIsErrorExist={(hasError) => updateErrorState('name', hasError)}
                        setResultData={setResultData}
                    />
                    <DefaultInput
                        id="url_set"
                        type="text"
                        placeholder="Repo Url"
                        value={repoUrl}
                        validateState={repoUrl}
                        onChange={setRepoUrl}
                        validateFunc={isValidRepoUrl}
                        setIsErrorExist={(hasError) => updateErrorState('repoUrl', hasError)}
                        setResultData={setResultData}
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
                            Приватный ?
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
                                    setResultData={setResultData}
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
                                    setResultData={setResultData}
                                />
                            </div>
                        )
                    }
                </form>
            </div>
            <button className="button_main_action" onClick={handleCreateRepo} disabled={Object.values(errorState).some(isError => isError)}>
                Создать
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}