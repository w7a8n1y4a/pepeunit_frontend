import { useGetVerificationUserLazyQuery } from '../../types/composition-functions';
import BaseModal from '../modal/BaseModal'
import logo from '/images/logo_32_32.png'
import signin_icon from '/images/signin.svg'
import signout_icon from '/images/signout.svg'
import SignInForm from '../forms/SignInForm';
import RegisterForm from '../forms/RegisterForm';
import { useState } from 'react'

export default function Header(){
    const [isModalSignInOpen, setIsModalSignInOpen] = useState(false)
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false)
    const [isModalUserMenu, setIsModalUserMenuOpen] = useState(false)
    const [isShowLogin, setShowLogin] = useState(true);
    const [verificationCode, setVerificationCode] = useState('');

    let user = localStorage.getItem('user')
    let login = user ? JSON.parse(user).login : ''

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

    const [getVerification] = useGetVerificationUserLazyQuery();

    const handleVerification = () => {
        localStorage.removeItem('verificationCode')

        getVerification().then(verificationCode => {
            if (verificationCode.data) { 
                setVerificationCode(verificationCode.data.getVerificationUser)
            } else {
                console.error('Ошибка получения кода:', verificationCode.error);
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
                        <button className="user_menu" onClick={() => setIsModalUserMenuOpen(true)}>
                            {login}
                        </button>
                        <button className="signout" onClick={signout}>
                            <img src={signout_icon} width="32" height="32" alt="signout"/>
                        </button>
                    </div>
                }
                <BaseModal open={isModalSignInOpen} closeModal={() => {setIsModalSignInOpen(false)}}>
                    <SignInForm
                        openModalRegister={openModalRegister}
                        setShowLogin={setShowLogin}
                        setIsModalSignInOpen={setIsModalSignInOpen}
                    />
                </BaseModal>
                <BaseModal open={isModalRegisterOpen} closeModal={() => {setIsModalRegisterOpen(false)}}>
                    <RegisterForm
                        openModalSignIn={openModalSignIn}
                        setShowLogin={setShowLogin}
                        setIsModalRegisterOpen={setIsModalRegisterOpen}
                    />
                </BaseModal>
                <BaseModal open={isModalUserMenu} closeModal={() => {setIsModalUserMenuOpen(false)}}>
                    <div>
                        Меню Пользователя {verificationCode}
                    </div>
                    <button className="verification" onClick={handleVerification}>
                        Верификация в Telegram
                    </button>
                    <button className="change_login" onClick={signout}>
                        Смена Логина
                    </button>
                    <button className="change_password" onClick={signout}>
                        Смена Пароля
                    </button>
                </BaseModal>
            </div>
        </header>
    )
}
