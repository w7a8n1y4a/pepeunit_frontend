import { useState } from 'react';
import { ResultType } from '@rootTypes/resultEnum'
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
    const { setActiveModal } = useModalStore();
    const { setUser } = useUserStore();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorState, setErrorState] = useState({
        login: true,
        password: true,
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

    const [getToken] = useGetTokenLazyQuery();
    const [getUser] = useGetUserLazyQuery();

    const handleLogin = () => {
        setIsLoaderActive(true)
        setResultData({
            ...resultData,
            message: null
        })

        localStorage.removeItem('token')
        getToken({
            variables: {
                credentials: login,
                password: password,
            }
        }).then(tokenData => {
            if (tokenData.data) { 
                localStorage.setItem('token', tokenData.data.getToken);
                getUser({
                    variables: {
                        uuid: getUserUuidByToken(tokenData.data.getToken)
                    }
                }).then(userData => {
                    if (userData.data) {
                        setUser(userData.data.getUser)
                    }
                    setActiveModal(null)
                    setIsLoaderActive(false)
                })
            }

            if (tokenData !== undefined && tokenData.errors) {
                setIsLoaderActive(false)
                setResultData({ type: ResultType.Angry, message: tokenData.errors[0].message.slice(4)})
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