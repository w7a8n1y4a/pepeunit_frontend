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


    function openModalSignIn(){
        setIsModalRegisterOpen(false)
        setIsModalSignInOpen(true)
    }
    function openModalRegister(){
        setIsModalSignInOpen(false)
        setIsModalRegisterOpen(true)
    }

    const [createUserMutation, createUserData] = useCreateUserMutation({
        variables: {
            login: loginReg,
            password: passwordReg
        },
    });
    
    console.log(createUserData)

    const [
        getToken,
        tokenData
    ] = useGetTokenLazyQuery({
        variables: {
            credentials: login,
            password: password,
        },
    });
    
    if (tokenData.data !== undefined && tokenData.data !== null){
        localStorage.removeItem('token');
        localStorage.setItem('token', tokenData.data.getToken);
        console.log(localStorage.getItem('token'))
    }

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
                <BaseModal open={isModalSignInOpen}>
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
                    <button className="signin" onClick={() => getToken()}>
                        Войти
                    </button>
                </BaseModal>
                <BaseModal open={isModalRegisterOpen}>
                    <button className="signin" onClick={openModalSignIn}>
                        Авторизация
                    </button>
                    <p>Регистрация</p>
                    <form>
                        <input
                            id='login_reg'
                            type='text_reg'
                            placeholder='Login'
                            value={loginReg}
                            onChange={(e) => setLoginReg(e.target.value)}
                        />
                        <input
                            id='password_reg'
                            type='password_reg'
                            placeholder='Password'
                            value={passwordReg}
                            onChange={(e) => setPasswordReg(e.target.value)}
                        />
                    </form>
                    <button className="register" onClick={() => createUserMutation()}>
                        Зарегистрировать
                    </button>
                </BaseModal>
            </div>
        </header>
    )
}
