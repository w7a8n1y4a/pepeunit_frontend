import { useState } from 'react';
import { useCreateUserMutation, useGetTokenLazyQuery } from '../../../types/composition-functions';
import isValidPassword from '../../../utils/isValidPassword'
import isValidLogin from '../../../utils/isValidLogin'
import isValidMatchPassword from '../../../utils/isValidMatchPassword'
import DefaultInput from '../primitives/DefaultInput'
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
    const [errorQuery, setErrorQuery] = useState<null | string>(null)
    
    const [createUserMutation] = useCreateUserMutation();
    const [getToken] = useGetTokenLazyQuery();
    
    const handleRegister = () => {

        localStorage.removeItem('token');
        createUserMutation({
            variables: {
                login: login,
                password: password
            }
        }).then(createUserData => {
            if (createUserData.errors){
                console.log(createUserData.errors)
            }
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
                    } else {
                        console.error('Ошибка получения токена:', tokenData.error);
                    }
                })
            }
        }).catch(error => {
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
                />
            </form>
            <button className="button_main_action" onClick={handleRegister} disabled={Object.values(errorState).some(isError => isError)}>
                Войти
            </button>
            <button className="button_open_alter" onClick={openModalSignIn}>
                Авторизация
            </button>
            {
                errorQuery !== null ? (
                    <div>
                        {errorQuery}
                    </div>
                ) : (<></>)
            }
        </>
    );
}