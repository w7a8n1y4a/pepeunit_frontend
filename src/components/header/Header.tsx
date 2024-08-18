import { useGetTokenLazyQuery, useCreateUserMutation } from '../../types/composition-functions'
import BaseModal from '../modal/BaseModal'
import logo from '/images/logo_32_32.png'
import signin from '/images/signin.svg'
import { useState } from 'react'

export default function Header(){
    const [isModalSignInOpen, setIsModalSignInOpen] = useState(false)
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loginReg, setLoginReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const [confirmPassReg, setConfirmPassReg] = useState('') 

    function isValidLogin(login: string) {
        const regex = /^[a-zA-Z0-9_.-]{4,20}$/;
        return regex.test(login);
    };
  
    function isValidPassword(password: string) {
        const regex = /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~]{8,100}$/;;
        return regex.test(password);
    };

    function openModalSignIn(){
        setIsModalRegisterOpen(false)
        setIsModalSignInOpen(true)
    }
    function openModalRegister(){
        setIsModalSignInOpen(false)
        setIsModalRegisterOpen(true)
    }
    
    const [createUserMutation] = useCreateUserMutation({
        variables: {
            login: loginReg,
            password: passwordReg
        },
    });
    
    const [
        getToken,
    ] = useGetTokenLazyQuery({
        variables: {
            credentials: login,
            password: password,
        },
    });

    const handleLogin = () => {
        getToken().then(tokenData => {

            console.log(tokenData)
            if (tokenData.data) { 
                localStorage.removeItem('token');
                localStorage.setItem('token', tokenData.data.getToken);
                console.log(tokenData.data.getToken)
            } else {
                console.error('Ошибка получения токена:', tokenData.error);
            }
        })
    };

    const handleRegister = () => {
        if (passwordReg !== confirmPassReg) {
            alert('Пароли не совпадают!');
            return;
        }

        if (!isValidLogin(loginReg) || !isValidPassword(passwordReg)) {
            console.log(isValidLogin(loginReg))
            console.log(isValidPassword(loginReg))
            alert("Неверный формат логина или пароля!");
            return;
        }

        createUserMutation().then(createUserData => {
            console.log(createUserData.data)

            if (createUserData.data) {
                console.log('Пользователь создан:', createUserData.data);
            }
        })

    };

    return (
        <header>
            <div>
                <a href='/'>
                    <img src={logo} alt="Icon"/>
                </a>
            </div>
            <div>
                <span>Search</span>
                <a href='https://pepeunit.com/' target="_blank">
                    <span>Docs</span>
                </a>
            </div>
            <div>
                <button className="signin" onClick={openModalSignIn}>
                    <img src={signin} width="32" height="32" alt="Signin"/>
                </button>
                <BaseModal open={isModalSignInOpen} closeModal={() => {setIsModalSignInOpen(false)}}>
                    <button className="signin" onClick={openModalRegister}>
                        Регистрация
                    </button>
                    <p>Авторизация</p>
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
                    <button className="signin" onClick={handleLogin}>
                        Войти
                    </button>
                </BaseModal>
                <BaseModal open={isModalRegisterOpen} closeModal={() => {setIsModalRegisterOpen(false)}}>
                    <button className="signin" onClick={openModalSignIn}>
                        Авторизация
                    </button>
                    <p>Регистрация</p>
                    <form>
                        <input
                            id='login_reg'
                            type='text'
                            placeholder='Login'
                            value={loginReg}
                            onChange={(e) => setLoginReg(e.target.value)}
                        />
                        <input
                            id='password_reg'
                            type='password'
                            placeholder='Password'
                            value={passwordReg}
                            onChange={(e) => setPasswordReg(e.target.value)}
                        />
                        <input
                            id='confirm_password_reg'
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassReg}
                            onChange={(e) => setConfirmPassReg(e.target.value)}
                        />
                    </form>
                    <button className="register" onClick={handleRegister}>
                        Зарегистрировать
                    </button>
                </BaseModal>
            </div>
        </header>
    )
}
