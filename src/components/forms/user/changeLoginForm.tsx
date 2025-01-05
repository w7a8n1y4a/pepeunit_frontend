import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useState, useEffect } from 'react';
import { useUpdateUserMutation } from '@rootTypes/compositionFunctions';
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import isValidLogin from '@utils/isValidLogin'
import '../form.css'

import { useUserStore } from '@stores/userStore';

interface ChangeLoginFormProps {
    currentLogin: string | undefined
}

export default function ChangeLoginForm({ currentLogin }: ChangeLoginFormProps) {
    const { resultData, setResultData, handleError, handleSuccess } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

    const { setUser } = useUserStore();

    const [login, setLogin] = useState(currentLogin);
    const [errorState, setErrorState] = useState({
        login: false,
    });
    
    useEffect(() => {
        setLogin(currentLogin)
    }, [currentLogin]);

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };

    const [updateUserMutation] = useUpdateUserMutation();

    const handleChangeLogin = () => {
        runAsync(async () => {

            let result = await updateUserMutation({
                variables: {
                    login: login
                }
            })
            if (result.data) { 
                setUser(result.data.updateUser)
                handleSuccess("New Login success set")
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
                        id="login_change"
                        type="text"
                        placeholder="New Login"
                        value={login ? login : ''}
                        validateState={login}
                        onChange={setLogin}
                        validateFunc={isValidLogin}
                        setIsErrorExist={(hasError) => updateErrorState('login', hasError)}
                        setResultData={setResultData}
                    />
                </form>
            </div>
            <button className="button_main_action" onClick={handleChangeLogin} disabled={Object.values(errorState).some(isError => isError)}>
                Изменить
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}