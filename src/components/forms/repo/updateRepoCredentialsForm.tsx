import { useState } from 'react';
import { useResultHandler } from '@rootTypes/useResultHandler';
import { useUpdateRepoCredentialsMutation, RepoType } from '@rootTypes/compositionFunctions'
import isValidString from '@utils/isValidString'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'

interface UpdateRepoCredentialsFormProps {
    currentNodeData: RepoType;
}

export default function UpdateRepoCredentialsForm({ currentNodeData }: UpdateRepoCredentialsFormProps) {
    const { resultData, setResultData, handleError, handleSuccess } = useResultHandler();

    const [repoUsername, setRepoUsername] = useState('');
    const [repoPatToken, setPatToken] = useState('');

    const [isLoaderActive, setIsLoaderActive] = useState(false)

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
        setIsLoaderActive(true)

        updateRepoCredentialsMutation({
            variables: {
                uuid: currentNodeData.uuid,
                data: {
                    username: repoUsername,
                    patToken: repoPatToken
                }
            }
        }).then(UpdateRepoData =>{
            if (UpdateRepoData.data){
                handleSuccess("Repo auth data successfully updated")
            }
        }).catch(error => {
            handleError(error);
        }).finally(() => {
            setIsLoaderActive(false);
        });
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
                Изменить
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}