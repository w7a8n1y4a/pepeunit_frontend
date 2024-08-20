import BaseModal from '../modal/BaseModal'
import logo from '/images/logo_32_32.png'
import signin_icon from '/images/signin.svg'
import signout_icon from '/images/signout.svg'
import SignInForm from '../forms/SignInForm';
import RegisterForm from '../forms/RegisterForm';
import VerificationForm from '../forms/VerificationForm';
import ChangeLoginForm from '../forms/ChangeLoginForm';
import ChangePassForm from '../forms/ChangePassForm';
import { useState, useCallback } from 'react';

export default function Header(){
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [isShowLogin, setShowLogin] = useState(true);

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
        setShowLogin(true);
        closeModal();
    }, [closeModal]);

    return (
        <header>
            <div>
                <a href='/'>
                    <img src={logo} alt="Icon" />
                </a>
            </div>
            <div>
                <a href='https://pepeunit.com/' target="_blank">
                    <span>Docs</span>
                </a>
                <span>Search</span>
            </div>
            <div>
                {isShowLogin ? (
                    <button className="signin" onClick={() => openModal('signin')}>
                        <img src={signin_icon} width="32" height="32" alt="Signin" />
                    </button>
                ) : (
                    <div>
                        <button className="user_menu" onClick={() => openModal('userMenu')}>
                            {login}
                        </button>
                        <button className="signout" onClick={signout}>
                            <img src={signout_icon} width="32" height="32" alt="signout" />
                        </button>
                    </div>
                )}

                <BaseModal open={activeModal === 'signin'} closeModal={closeModal}>
                    <SignInForm
                        openModalRegister={() => openModal('register')}
                        setShowLogin={setShowLogin}
                        setActiveModal={setActiveModal}
                    />
                </BaseModal>

                <BaseModal open={activeModal === 'register'} closeModal={closeModal}>
                    <RegisterForm
                        openModalSignIn={() => openModal('signin')}
                        setShowLogin={setShowLogin}
                        setActiveModal={setActiveModal}
                    />
                </BaseModal>

                <BaseModal open={activeModal === 'userMenu'} closeModal={closeModal}>
                    <div>Меню Пользователя</div>
                    <button className="verification" onClick={() => openModal('verification')}>
                        Верификация в Telegram
                    </button>
                    <button className="change_login" onClick={() => openModal('changeLogin')}>
                        Смена Логина
                    </button>
                    <button className="change_password" onClick={() => openModal('changePass')}>
                        Смена Пароля
                    </button>
                </BaseModal>

                <BaseModal open={activeModal === 'verification'} closeModal={closeModal}>
                    <VerificationForm />
                </BaseModal>

                <BaseModal open={activeModal === 'changeLogin'} closeModal={closeModal}>
                    <ChangeLoginForm setActiveModal={setActiveModal} />
                </BaseModal>

                <BaseModal open={activeModal === 'changePass'} closeModal={closeModal}>
                    <ChangePassForm setActiveModal={setActiveModal} />
                </BaseModal>
            </div>
        </header>
    );
}
