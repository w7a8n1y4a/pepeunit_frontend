import { useState } from 'react';
import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useCreateUserMutation, useGetTokenLazyQuery } from '@rootTypes/compositionFunctions';
import isValidPassword from '@utils/isValidPassword'
import isValidLogin from '@utils/isValidLogin'
import isValidMatchPassword from '@utils/isValidMatchPassword'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'

import { useModalStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';


interface RegisterFormProps {
    openModalSignIn: () => void;
}

export default function RegisterForm({ openModalSignIn }: RegisterFormProps) {
    const { resultData, setResultData, handleError } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

    const { setActiveModal } = useModalStore();
    const { setUser } = useUserStore();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorState, setErrorState] = useState({
        login: true,
        password: true,
        confirmPassword: true
    });

    const [createUserMutation] = useCreateUserMutation();
    const [getToken] = useGetTokenLazyQuery();
    
    const handleRegister = () => {
        runAsync(async () => {

            localStorage.removeItem('token');
            let result = await createUserMutation({
                variables: {
                    login: login,
                    password: password
                }
            })
            if (result.data) {
                let tokenData = await getToken({
                    variables: {
                        credentials: login,
                        password: password,
                    }
                })
                if (tokenData.data) { 
                    localStorage.setItem('token', tokenData.data.getToken);
                    if (result.data) {
                        setUser(result.data.createUser)
                    }
                    setActiveModal(null)
                }
            }
        })
    };

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };

    return (
        <>
            {
                isLoaderActive && (<Spinner/>)
            }
            <form>
                <DefaultInput
                    id="login_reg"
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
                    id="password_reg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    validateState={password}
                    onChange={setPassword}
                    validateFunc={isValidPassword}
                    setIsErrorExist={(hasError) => updateErrorState('password', hasError)}
                    setResultData={setResultData}
                />
                <DefaultInput
                    id="confirm_password_reg"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    validateState={{password: password, confirmPassword: confirmPassword}}
                    onChange={setConfirmPassword}
                    validateFunc={isValidMatchPassword}
                    setIsErrorExist={(hasError) => updateErrorState('confirmPassword', hasError)}
                    setResultData={setResultData}
                />
            </form>
            <button className="button_main_action" onClick={handleRegister} disabled={Object.values(errorState).some(isError => isError)}>
                Создать
            </button>
            <button className="button_open_alter_auth" onClick={openModalSignIn}>
                Авторизация
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}