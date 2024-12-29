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
import back_img from '/images/back.svg'
import { useState, useCallback, useReducer, useEffect } from 'react';

import { useModalStore, useSearchNodeStore, useReloadBaseGraphDataStore, useNodeStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';
import { useUserStore } from '@stores/userStore';

export default function Header(){
    const { activeModal } = useModalStore();
    const { openModal, closeModal } = useModalHandlers();

    const { setCurrentNodeData } = useNodeStore();
    const { currentSearchNodeData } = useSearchNodeStore();
    const { reloadState, setReloadState } = useReloadBaseGraphDataStore();
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
            <div className="search-div">
                <button aria-label="Search" className="search-button" onClick={() => openModal('graphSearch')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="20" height="20">
                        <path d="M11 4a7 7 0 1 1 0 14a7 7 0 0 1 0-14zm0-2a9 9 0 1 0 6.219 15.546l4.396 4.395l1.414-1.414l-4.395-4.396A9 9 0 0 0 11 2z" fill="currentColor"/>
                    </svg>
                    Search
                </button>
            </div>

            {
                currentSearchNodeData && (
                    <div className="search-mod-menu">
                        <button className="search-button" onClick={() => {setReloadState(!reloadState)}}>
                            <img src={back_img} width="20" height="20" alt="Back"/>
                        </button>
                        <button className="search-button" onClick={() => {
                                setCurrentNodeData(currentSearchNodeData)
                                openModal(currentSearchNodeData.__typename.toLowerCase().slice(0,-4) + 'Menu')
                            }}>
                            {currentSearchNodeData.name || currentSearchNodeData.login}
                        </button>
                    </div>
                )
            }

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
