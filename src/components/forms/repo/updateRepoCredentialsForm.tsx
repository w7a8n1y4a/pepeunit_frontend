import { useState } from 'react';
import { ResultType } from '@rootTypes/resultEnum'
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
    const [repoUsername, setRepoUsername] = useState('');
    const [repoPatToken, setPatToken] = useState('');

    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });

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
        setResultData({
            ...resultData,
            message: null
        })

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
                setIsLoaderActive(false)
                setResultData({ type: ResultType.Happy, message: "Авторизационные данные успешно обновлены"})
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