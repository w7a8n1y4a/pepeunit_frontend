import { useState, useEffect } from 'react';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useSetCredentialsMutation, useGetCredentialsLazyQuery} from '@rootTypes/compositionFunctions'
import { stringToFormat } from '@utils/stringToFormat'
import isValidString from '@utils/isValidString'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import '../form.css'

import { useNodeStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';


export default function UpdateRepositoryRegistryCredentialsForm() {
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { currentNodeData } = useNodeStore();

    const [repoUsername, setRepoUsername] = useState('');
    const [repoPatToken, setPatToken] = useState('');
    const [repoStatus, setStatus] = useState<null | string>(null);
    const [update, setUpdate] = useState<boolean>(true);

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
    const [getCredentials] = useGetCredentialsLazyQuery();

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
                setHappy("Repository auth data successfully updated")
                setUpdate(!update)
            }
        })
    };

    useEffect(() => {
        console.log('test')
        if (currentNodeData.__typename == "RepositoryRegistryType") {
            runAsync(async () => {
                console.log('one')
                let credentials = await getCredentials({
                    variables: {
                        uuid: currentNodeData.uuid
                    }
                })
                if (credentials.data){
                    console.log(credentials.data)
                    if (credentials.data?.getCredentials){
                        setRepoUsername(credentials.data.getCredentials.credentials.username)
                        setPatToken(credentials.data.getCredentials.credentials.patToken)
                        setStatus(credentials.data.getCredentials.status)
                    } else {
                        setRepoUsername('')
                        setPatToken('')
                        setStatus(null)
                    }
                }
            })
        }

    }, [currentNodeData, update]);

    return (
        <>
            {
                isLoaderActive && (<Spinner/>)
            }
            {
                repoStatus && (
                    <div className='div_unit_message'>
                        Status: {stringToFormat(repoStatus)}
                    </div>
                )
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