import { useState } from 'react';
import { useCreateUserMutation, useGetTokenLazyQuery } from '../../../types/composition-functions';
import isValidPassword from '../../../utils/isValidPassword'
import isValidLogin from '../../../utils/isValidLogin'
import '../form.css'

interface RegisterFormProps {
    openModalSignIn: () => void;
    setActiveModal: (show: string | null) => void;
}

export default function RegisterForm({ openModalSignIn, setActiveModal }: RegisterFormProps) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [createUserMutation] = useCreateUserMutation();
    const [getToken] = useGetTokenLazyQuery();

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }

        if (!isValidLogin(login) || !isValidPassword(password)) {
            alert("Неверный формат логина или пароля!");
            return;
        }

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
                    } else {
                        console.error('Ошибка получения токена:', tokenData.error);
                    }
                })
            }
        })

    };

    return (
        <>
            <form>
                <input
                    id='login_reg'
                    type='text'
                    placeholder='Login'
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <input
                    id='password_reg'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    id='confirm_password_reg'
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </form>
            <button className="button_main_action" onClick={handleRegister}>
                Войти
            </button>
            <button className="button_open_alter" onClick={openModalSignIn}>
                Авторизация
            </button>
        </>
    );
}