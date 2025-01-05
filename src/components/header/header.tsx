import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
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
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import { UserRole, useBlockUserMutation, useUnblockUserMutation } from '@rootTypes/compositionFunctions'
import './header.css'
import { useState, useCallback, useReducer, useEffect } from 'react';

import { useModalStore, useNodeStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';
import { useUserStore } from '@stores/userStore';
import SearchMenu from '../searchMenu/searchMenu';

export default function Header(){
    const { resultData, handleError, handleSuccess } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

    const { activeModal } = useModalStore();
    const { openModal, closeModal } = useModalHandlers();
    const { currentNodeData, setCurrentNodeData } = useNodeStore();
    const { user, clearUser } = useUserStore();
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const [login, setLogin ] = useState(user?.login)

    const [blockUser] = useBlockUserMutation();
    const [unblockUser] = useUnblockUserMutation();

    useEffect(() => {
        setLogin(user?.login)
    }, [user]);

    const signout = useCallback(() => {
        localStorage.removeItem('token');
        clearUser()
        closeModal();
        forceUpdate();
    }, [closeModal]);

    const handleBlockUser = () => {
        runAsync(async () => {
            let result = await blockUser({
                variables: {
                    uuid: currentNodeData.uuid,
                }
            })
            if (result.data){
                handleSuccess("User " + currentNodeData.login + " success blocked")
            }
        })
    };

    const handleUnblockUser = () => {
        runAsync(async () => {
            let result = await unblockUser({
                variables: {
                    uuid: currentNodeData.uuid,
                }
            })
            if (result.data){
                handleSuccess("User " + currentNodeData.login + " success unblocked")
            }
        })
    };

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
                        <button className="user_menu_button" onClick={() => {
                            setCurrentNodeData(null)
                            openModal('userMenu')
                        
                        }}>
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
                <BaseModal modalName='Authorization' open={activeModal === 'signin'}>
                    <SignInForm
                        openModalRegister={() => openModal('register')}
                    />
                </BaseModal>
                <BaseModal modalName='Registration' open={activeModal === 'register'}>
                    <RegisterForm
                        openModalSignIn={() => openModal('signin')}
                    />
                </BaseModal>
                <BaseModal modalName='User' open={activeModal === 'userMenu'}>
                    <div className="modal_menu_content">
                        {
                            isLoaderActive && (<Spinner/>)
                        }
                        {
                            user && (!currentNodeData || currentNodeData && currentNodeData.uuid == user.uuid) && (
                                <>
                                    <button className="button_open_alter" onClick={() => openModal('verification')}>
                                        Telegram Verification
                                    </button>
                                    <button className="button_open_alter" onClick={() => openModal('changeLogin')}>
                                        Change Login
                                    </button>
                                    <button className="button_open_alter" onClick={() => openModal('changePass')}>
                                        Change Password
                                    </button>
                                </>
                            )
                        }
                        {
                            user && currentNodeData && currentNodeData.uuid != user.uuid && (
                                <>
                                    <div>
                                        {currentNodeData.login}
                                    </div>
                                    <div>
                                        {currentNodeData.role}
                                    </div>
                                    <div>
                                        {currentNodeData.status}
                                    </div>
                                    <div>
                                        {currentNodeData.createDatetime}
                                    </div>
                                    {
                                        user.role == UserRole.Admin && (
                                            <>
                                                <button className="button_open_alter" onClick={() => handleBlockUser()}>
                                                    Block
                                                </button>
                                                <button className="button_open_alter" onClick={() => handleUnblockUser()}>
                                                    Unblock
                                                </button>
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
                        <ResultQuery
                            resultData={resultData}
                        />
                    </div>
                </BaseModal>
                <BaseModal
                    modalName='Verification'
                    open={activeModal === 'verification'}
                    openModalType='userMenu'
                >
                    <VerificationForm />
                </BaseModal>
                <BaseModal
                    modalName='Change Login'
                    open={activeModal === 'changeLogin'}
                    openModalType='userMenu'
                >
                    <ChangeLoginForm currentLogin={login}/>
                </BaseModal>
                <BaseModal
                    modalName='Change Password'
                    open={activeModal === 'changePass'}
                    openModalType='userMenu'
                >
                    <ChangePassForm />
                </BaseModal>
            </div>
        </header>
    );
}
