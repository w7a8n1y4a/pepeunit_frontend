import BaseModal from '../modal/baseModal'
import logo from '/images/logo_32_32.png'
import signin_icon from '/images/signin.svg'
import signout_icon from '/images/signout.svg'
import SignInForm from '../forms/user/signInForm';
import RegisterForm from '../forms/user/registerForm';
import VerificationForm from '../forms/user/verificationForm';
import ChangeLoginForm from '../forms/user/changeLoginForm';
import ChangePassForm from '../forms/user/changePassForm';
import RightMenu from '../rightMenu/rightMenu';
import './header.css'
import { useState, useCallback, useReducer, useEffect } from 'react';

import { useModalStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';
import { useUserStore } from '@stores/userStore';
import SearchMenu from '../searchMenu/searchMenu';

export default function Header(){
    const { activeModal } = useModalStore();
    const { openModal, closeModal } = useModalHandlers();

    const { user, clearUser } = useUserStore();

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const [login, setLogin ] = useState(user?.login)

    useEffect(() => {
        setLogin(user?.login)
    }, [user]);

    const signout = useCallback(() => {
        localStorage.removeItem('token');
        clearUser()
        closeModal();
        forceUpdate();
    }, [closeModal]);

    return (
        <header className='app-header'>
            <div className='logo'>
                <a href='/'>
                    <img src={logo} alt="Icon" />
                </a>
            </div>
            <div className='docs'>
                <a href='https://pepeunit.com/' target="_blank">
                    Docs
                </a>
            </div>

            <SearchMenu/>

            <div className='user_controls'>
                {login ? (
                    <div>
                        <button className="user_menu_button" onClick={() => openModal('userMenu')}>
                            {login}
                        </button>
                        <button className="signout_button" onClick={signout}>
                            <img src={signout_icon} width="32" height="32" alt="signout" />
                        </button>
                        <RightMenu/>
                    </div>
                    
                ) : (

                    <button className="signin_button" onClick={() => openModal('signin')}>
                        <img src={signin_icon} width="32" height="32" alt="Signin" />
                    </button>
                )}
            </div>
            <div>
                <BaseModal modalName='Авторизация' open={activeModal === 'signin'}>
                    <SignInForm
                        openModalRegister={() => openModal('register')}
                    />
                </BaseModal>
                <BaseModal modalName='Регистрация' open={activeModal === 'register'}>
                    <RegisterForm
                        openModalSignIn={() => openModal('signin')}
                    />
                </BaseModal>
                <BaseModal modalName='Меню' open={activeModal === 'userMenu'}>
                    <div className="modal_menu_content">
                        <button className="button_open_alter" onClick={() => openModal('verification')}>
                            Верификация в Telegram
                        </button>
                        <button className="button_open_alter" onClick={() => openModal('changeLogin')}>
                            Смена Логина
                        </button>
                        <button className="button_open_alter" onClick={() => openModal('changePass')}>
                            Смена Пароля
                        </button>
                    </div>
                </BaseModal>
                <BaseModal
                    modalName='Верификация'
                    open={activeModal === 'verification'}
                    openModalType='userMenu'
                >
                    <VerificationForm />
                </BaseModal>
                <BaseModal
                    modalName='Смена Логина'
                    open={activeModal === 'changeLogin'}
                    openModalType='userMenu'
                >
                    <ChangeLoginForm currentLogin={login}/>
                </BaseModal>
                <BaseModal
                    modalName='Смена Пароля'
                    open={activeModal === 'changePass'}
                    openModalType='userMenu'
                >
                    <ChangePassForm />
                </BaseModal>
            </div>
        </header>
    );
}
