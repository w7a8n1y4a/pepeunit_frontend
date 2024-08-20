import { useState } from 'react';
import { useCreateUserMutation, useGetTokenLazyQuery } from '../../types/composition-functions';
import isValidPassword from '../../utils/isValidPassword'
import isValidLogin from '../../utils/isValidLogin'

interface RegisterFormProps {
    openModalSignIn: () => void;
    setShowLogin: (show: boolean) => void;
    setActiveModal: (show: string | null) => void;
}

export default function RegisterForm({ openModalSignIn, setShowLogin, setActiveModal }: RegisterFormProps) {
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

                        setShowLogin(false)
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
            <button className="signin" onClick={openModalSignIn}>
                Авторизация
            </button>
            <p>Регистрация</p>
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
            <button className="register" onClick={handleRegister}>
                Зарегистрировать
            </button>
        </>
    );
}