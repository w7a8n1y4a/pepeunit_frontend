import { useState } from 'react';
import '../form.css'

export default function UpdateRepoCredentialsForm() {
    const [repoUsername, setRepoUsername] = useState('');
    const [repoPatToken, setPatToken] = useState('');

    return (
        <>
            <div>
                <form>
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
                </form>
            </div>
            <button className="button_main_action">
                Изменить
            </button>
        </>
    );
}