import { useState } from 'react';
import { useGetTokenLazyQuery, useGetUserLazyQuery } from '../../types/composition-functions';
import { getUserUuidByToken } from '../../utils/getUserUuidByToken';
import './form.css'

interface SignInFormProps {
    openModalRegister: () => void;
    setShowLogin: (show: boolean) => void;
    setActiveModal: (show: string | null) => void;
}

export default function SignInForm({openModalRegister, setShowLogin, setActiveModal }: SignInFormProps) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    
    const [getToken] = useGetTokenLazyQuery();
    const [getUser] = useGetUserLazyQuery();

    const handleLogin = () => {
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
                        localStorage.setItem('user', JSON.stringify(userData.data.getUser));
                    }
                    setShowLogin(false)
                    setActiveModal(null)
                })
            } else {
                console.error('Ошибка получения токена:', tokenData.error);
            }
        })
    };

    return (
        <>
            <form>
                <input
                    id='login_auth'
                    type='text'
                    placeholder='Login'
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input
                    id='password_auth'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </form>
            <button className="button_main_action" onClick={handleLogin}>
                Войти
            </button>
            <button className="button_open_alter" onClick={openModalRegister}>
                Регистрация
            </button>
        </>
    );
}