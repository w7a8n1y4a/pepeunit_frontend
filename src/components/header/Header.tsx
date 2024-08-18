import { useGetTokenLazyQuery, useCreateUserMutation, useGetUserLazyQuery } from '../../types/composition-functions'
import BaseModal from '../modal/BaseModal'
import logo from '/images/logo_32_32.png'
import signin_icon from '/images/signin.svg'
import signout_icon from '/images/signout.svg'
import { getUserUuidByToken } from '../../utils/getUserUuidByToken';
import { useState } from 'react'

export default function Header(){
    const [isModalSignInOpen, setIsModalSignInOpen] = useState(false)
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false)
    const [isShowLogin, setShowLogin] = useState(true);

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
    function signout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsModalSignInOpen(false)
        setShowLogin(true)
    }
    
    const [ createUserMutation ] = useCreateUserMutation();
    const [ getToken ] = useGetTokenLazyQuery();
    const [ getUser ]  = useGetUserLazyQuery();

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
                        localStorage.setItem('user', JSON.stringify(userData.data));
                    }
                    setShowLogin(false)
                    setIsModalSignInOpen(false)
                })
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
            alert("Неверный формат логина или пароля!");
            return;
        }

        localStorage.removeItem('token');
        createUserMutation({
            variables: {
                login: loginReg,
                password: passwordReg
            }
        }).then(createUserData => {
            if (createUserData.data) {
                console.log('Пользователь создан:', createUserData.data);

                getToken({
                    variables: {
                        credentials: loginReg,
                        password: passwordReg,
                    }
                }).then(tokenData => {
                    if (tokenData.data) { 
                        localStorage.setItem('token', tokenData.data.getToken);
                        localStorage.setItem('user', JSON.stringify(createUserData.data));
                    } else {
                        console.error('Ошибка получения токена:', tokenData.error);
                    }
                })
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
                {
                    isShowLogin
                    ?
                    <button className="signin" onClick={openModalSignIn}>
                        <img src={signin_icon} width="32" height="32" alt="Signin"/>
                    </button>
                    :
                    <div>
                        <button className="signout" onClick={signout}>
                            {login}
                        </button>
                        <button className="signout" onClick={signout}>
                            <img src={signout_icon} width="32" height="32" alt="signout"/>
                        </button>
                    </div>
                }
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
