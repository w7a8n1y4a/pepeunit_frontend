import { useState } from 'react';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useSetCredentialsMutation } from '@rootTypes/compositionFunctions'
import isValidString from '@utils/isValidString'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import '../form.css'

import { useNodeStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';


export default function UpdateRepoCredentialsForm() {
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { currentNodeData } = useNodeStore();

    const [repoUsername, setRepoUsername] = useState('');
    const [repoPatToken, setPatToken] = useState('');

    const [errorState, setErrorState] = useState({
        username: true,
        patToken: true
    });

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };

    const [updateSetCredentialsMutation] = useSetCredentialsMutation();

    const handleUpdateCredentials = () => {
        runAsync(async () => {

            let result = await updateSetCredentialsMutation({
                variables: {
                    uuid: currentNodeData.uuid,
                    data: {
                        username: repoUsername,
                        patToken: repoPatToken
                    }
                }
            })
            if (result.data){
                setHappy("Repo auth data successfully updated")
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
                </form>
            </div>
            <button className="button_main_action" onClick={handleUpdateCredentials} disabled={Object.values(errorState).some(isError => isError)} >
                Change
            </button>
        </>
    );
}