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
    const [isShowLogin, setShowLogin] = useState(true);

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
                            login
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
            </div>
        </header>
    )
}
