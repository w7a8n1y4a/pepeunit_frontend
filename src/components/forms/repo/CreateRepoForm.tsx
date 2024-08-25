import { useCreateRepoMutation, VisibilityLevel, CreateRepoMutationVariables } from '../../../types/composition-functions'
import { useState } from 'react';
import '../form.css'


interface CreateRepoFormProps {
    setActiveModal: (show: string | null) => void;
}

export default function CreateRepoForm({ setActiveModal }:CreateRepoFormProps) {
    const [repoName, setRepoName] = useState('');
    const [repoUrl, setRepoUrl] = useState('');
    const [repoVisibilityLevel, setRepoVisibilityLevel] = useState(VisibilityLevel.Public);
    const [isPrivateRepository, setIsPrivateRepository] = useState(false);
    const [repoUsername, setRepoUsername] = useState('');
    const [repoPatToken, setPatToken] = useState('');
    
    const [createRepoMutation] = useCreateRepoMutation();

    const handleCreateRepo = () => {

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

        console.log(repoVariables)
        
        createRepoMutation({
            variables: repoVariables
        }).then(CreateRepoData =>{
            if (CreateRepoData.data){
                console.log('Repo создан', CreateRepoData.data)
                setActiveModal(null)
            }
        })
    };

    return (
        <>
            <div>
                <form>
                    <input
                        id='name_change'
                        type='text'
                        placeholder='Name'
                        value={repoName}
                        onChange={(e) => setRepoName(e.target.value)}
                    />
                    <input
                        id='url_change'
                        type='text'
                        placeholder='Repo Url'
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
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
                                onChange={(e) => setIsPrivateRepository(e.target.checked)} 
                            />
                            <span className="slider"></span>
                        </label>
                        <div className="toggle_text">
                            Требуется авторизация?
                        </div>
                    </div>
                    {
                        isPrivateRepository ? (
                            <div>
                                <input
                                    id='repo_username'
                                    type='text'
                                    placeholder='Username'
                                    value={repoUsername}
                                    onChange={(e) => setRepoUsername(e.target.value)}
                                />
                                <input
                                    id='repo_pat_token'
                                    type='password'
                                    placeholder='Pat Token'
                                    value={repoPatToken}
                                    onChange={(e) => setPatToken(e.target.value)}
                                />
                            </div>
                        ) : (<></>)
                    }
                </form>
            </div>
            <button className="button_main_action" onClick={handleCreateRepo}>
                Создать
            </button>
        </>
    );
}