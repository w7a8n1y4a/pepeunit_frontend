import { useState } from 'react';
import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useUpdateRepoCredentialsMutation } from '@rootTypes/compositionFunctions'
import isValidString from '@utils/isValidString'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'

import { useNodeStore } from '@stores/baseStore';

export default function UpdateRepoCredentialsForm() {
    const { resultData, setResultData, handleError, handleSuccess } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

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

    const [updateRepoCredentialsMutation] = useUpdateRepoCredentialsMutation();

    const handleUpdateCredentials = () => {
        runAsync(async () => {

            let result = await updateRepoCredentialsMutation({
                variables: {
                    uuid: currentNodeData.uuid,
                    data: {
                        username: repoUsername,
                        patToken: repoPatToken
                    }
                }
            })
            if (result.data){
                handleSuccess("Repo auth data successfully updated")
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
                </form>
            </div>
            <button className="button_main_action" onClick={handleUpdateCredentials} disabled={Object.values(errorState).some(isError => isError)} >
                Change
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}