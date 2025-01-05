import { useState } from 'react';
import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetTokenLazyQuery, useGetUserLazyQuery } from '@rootTypes/compositionFunctions';
import { getUserUuidByToken } from '@utils/getUserUuidByToken';
import isValidPassword from '@utils/isValidPassword'
import isValidLogin from '@utils/isValidLogin'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'

import { useModalStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';

interface SignInFormProps {
    openModalRegister: () => void;
}

export default function SignInForm({openModalRegister}: SignInFormProps) {
    const { resultData, setResultData, handleError } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

    const { setActiveModal } = useModalStore();
    const { setUser } = useUserStore();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorState, setErrorState] = useState({
        login: true,
        password: true,
    });
    
    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };

    const [getToken] = useGetTokenLazyQuery();
    const [getUser] = useGetUserLazyQuery();

    const handleLogin = () => {
        runAsync(async () => {
            localStorage.removeItem('token')
            let result = await getToken({
                variables: {
                    credentials: login,
                    password: password,
                }
            })
            if (result.data) { 
                localStorage.setItem('token', result.data.getToken);

                let userData = await getUser({
                    variables: {
                        uuid: getUserUuidByToken(result.data.getToken)
                    }
                })
                if (userData.data) {
                    setUser(userData.data.getUser)
                }
                setActiveModal(null)
            }
        })
    };

    return (
        <>
            {
                isLoaderActive && (<Spinner/>)
            }
            <form>
                <DefaultInput
                    id="login_auth"
                    type="text"
                    placeholder="Login"
                    value={login}
                    validateState={login}
                    onChange={setLogin}
                    validateFunc={isValidLogin}
                    setIsErrorExist={(hasError) => updateErrorState('login', hasError)}
                    setResultData={setResultData}
                />
                <DefaultInput
                    id="password_auth"
                    type="password"
                    placeholder="Password"
                    value={password}
                    validateState={password}
                    onChange={setPassword}
                    validateFunc={isValidPassword}
                    setIsErrorExist={(hasError) => updateErrorState('password', hasError)}
                    setResultData={setResultData}
                />
            </form>
            <button className="button_main_action" onClick={handleLogin} disabled={Object.values(errorState).some(isError => isError)}>
                Войти
            </button>
            <button className="button_open_alter_auth" onClick={openModalRegister}>
                Регистрация
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}