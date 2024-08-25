import BaseModal from '../modal/BaseModal'
import logo from '/images/logo_32_32.png'
import signin_icon from '/images/signin.svg'
import signout_icon from '/images/signout.svg'
import SignInForm from '../forms/user/SignInForm';
import RegisterForm from '../forms/user/RegisterForm';
import VerificationForm from '../forms/user/VerificationForm';
import ChangeLoginForm from '../forms/user/ChangeLoginForm';
import ChangePassForm from '../forms/user/ChangePassForm';
import RightMenu from '../RightMenu/RightMenu';
import './Header.css'
import { useState, useCallback, useReducer } from 'react';

export default function Header(){
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const user = localStorage.getItem('user');
    const login = user ? JSON.parse(user).login : '';

    const openModal = useCallback((modalType: string) => {
        setActiveModal(modalType);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
    }, []);

    const signout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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
            <div className='search'>
                Search
            </div>
            <div className='user_controls'>
                {login !== '' ? (
                    <div>
                        <button className="user_menu_button" onClick={() => openModal('userMenu')}>
                            {login}
                        </button>
                        <button className="signout_button" onClick={signout}>
                            <img src={signout_icon} width="32" height="32" alt="signout" />
                        </button>
                        <RightMenu
                            activeModal={activeModal}
                            setActiveModal={setActiveModal}
                            openModal={openModal}
                            closeModal={closeModal}
                        />
                    </div>
                    
                ) : (

                    <button className="signin_button" onClick={() => openModal('signin')}>
                        <img src={signin_icon} width="32" height="32" alt="Signin" />
                    </button>
                )}
            </div>
            <div>
                <BaseModal modalName='Авторизация' open={activeModal === 'signin'} closeModal={closeModal}>
                    <SignInForm
                        openModalRegister={() => openModal('register')}
                        setActiveModal={setActiveModal}
                    />
                </BaseModal>
                <BaseModal modalName='Регистрация' open={activeModal === 'register'} closeModal={closeModal}>
                    <RegisterForm
                        openModalSignIn={() => openModal('signin')}
                        setActiveModal={setActiveModal}
                    />
                </BaseModal>
                <BaseModal modalName='Меню' open={activeModal === 'userMenu'} closeModal={closeModal}>
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
                <BaseModal modalName='Верификация' open={activeModal === 'verification'} closeModal={closeModal}>
                    <VerificationForm />
                </BaseModal>
                <BaseModal modalName='Смена Логина' open={activeModal === 'changeLogin'} closeModal={closeModal}>
                    <ChangeLoginForm setActiveModal={setActiveModal} />
                </BaseModal>
                <BaseModal modalName='Смена Пароля' open={activeModal === 'changePass'} closeModal={closeModal}>
                    <ChangePassForm setActiveModal={setActiveModal} />
                </BaseModal>
            </div>
        </header>
    );
}
