import { useState } from 'react';
import { useCreateUserMutation, useGetTokenLazyQuery } from '../../../types/composition-functions';
import angry_img from '/images/pepe/angry.svg'
import isValidPassword from '../../../utils/isValidPassword'
import isValidLogin from '../../../utils/isValidLogin'
import isValidMatchPassword from '../../../utils/isValidMatchPassword'
import DefaultInput from '../primitives/DefaultInput'
import Spinner from '../primitives/Spinner'
import '../form.css'

interface RegisterFormProps {
    openModalSignIn: () => void;
    setActiveModal: (show: string | null) => void;
}

export default function RegisterForm({ openModalSignIn, setActiveModal }: RegisterFormProps) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorState, setErrorState] = useState({
        login: true,
        password: true,
        confirmPassword: true
    });
    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [errorQuery, setErrorQuery] = useState<null | string>(null)

    const [createUserMutation] = useCreateUserMutation();
    const [getToken] = useGetTokenLazyQuery();
    
    const handleRegister = () => {
        setIsLoaderActive(true)
        setErrorQuery(null)

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
                        localStorage.setItem('user', JSON.stringify(createUserData.data?.createUser));

                        setActiveModal(null)
                        setIsLoaderActive(false)
                    }
                })
            }
        }).catch(error => {
            setIsLoaderActive(false)
            setErrorQuery(error.graphQLErrors[0].message)
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
                isLoaderActive ? (<Spinner/>) : (<></>)
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
                    errorQuery={setErrorQuery}
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
                    errorQuery={setErrorQuery}
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
                    errorQuery={setErrorQuery}
                />
            </form>
            <button className="button_main_action" onClick={handleRegister} disabled={Object.values(errorState).some(isError => isError)}>
                Создать
            </button>
            <button className="button_open_alter" onClick={openModalSignIn}>
                Авторизация
            </button>
            {
                errorQuery !== null ? (
                    <div className="info_error_message">
                        <img src={angry_img} width="36" height="36" alt="signout" />
                        <div className="info_error_message_text">
                            {errorQuery}
                        </div>
                    </div>
                ) : (<></>)
            }
        </>
    );
}