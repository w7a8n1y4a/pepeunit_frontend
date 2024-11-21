import { useState } from 'react';
import { ResultType } from '@rootTypes/resultEnum'
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
    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });

    const [createUserMutation] = useCreateUserMutation();
    const [getToken] = useGetTokenLazyQuery();
    
    const handleRegister = () => {
        setIsLoaderActive(true)
        setResultData({
            ...resultData,
            message: null
        })

        localStorage.removeItem('token');
        createUserMutation({
            variables: {
                login: login,
                password: password
            }
        }).then(createUserData => {
            if (createUserData.data) {
                console.log('Пользователь создан:', createUserData.data);

                getToken({
                    variables: {
                        credentials: login,
                        password: password,
                    }
                }).then(tokenData => {
                    if (tokenData.data) { 
                        localStorage.setItem('token', tokenData.data.getToken);
                        if (createUserData.data) {
                            setUser(createUserData.data.createUser)
                        }
                        setActiveModal(null)
                        setIsLoaderActive(false)
                    }
                })
            }
        }).catch(error => {
            setIsLoaderActive(false)
            setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
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