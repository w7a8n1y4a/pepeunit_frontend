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
import CreateRepoForm from '../forms/repo/createRepoForm'
import Spinner from '@primitives/spinner'
import { UserRole, useBlockUserMutation, useUnblockUserMutation, useDeleteUserCookiesMutation } from '@rootTypes/compositionFunctions'
import './header.css'
import { useState, useCallback, useReducer, useEffect } from 'react';

import { useModalStore, useNodeStore, usePickRegistryStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';
import { useUserStore } from '@stores/userStore';
import { useErrorStore } from '@stores/errorStore';
import micro from '/images/micro.svg'
import grafana from '/images/grafana.svg'
import SearchMenu from '../searchMenu/searchMenu';

export default function Header(){
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { activeModal } = useModalStore();
    const { openModal, closeModal, previousModal } = useModalHandlers();
    const { currentNodeData, setCurrentNodeData } = useNodeStore();
    const { setCurrentPickRegistryData, currentPickRegistryData } = usePickRegistryStore();
    const { user, clearUser } = useUserStore();
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const [login, setLogin ] = useState(user?.login)

    const [blockUser] = useBlockUserMutation();
    const [unblockUser] = useUnblockUserMutation();
    const [deleteUserCookies] = useDeleteUserCookiesMutation();

    useEffect(() => {
        setLogin(user?.login)
    }, [user]);

    const signout = useCallback(() => {
        localStorage.removeItem('token');
        clearUser()
        closeModal();

        runAsync(async () => {
            await deleteUserCookies()
        })

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
                setHappy("User " + currentNodeData.login + " success blocked")
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
                setHappy("User " + currentNodeData.login + " success unblocked")
            }
        })
    };

    function pickRepoCreate() {
        setCurrentPickRegistryData(null)
        openModal('createRepo')
    }

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
                    <>
                        <button className="signin_button" onClick={() => pickRepoCreate()}>
                            <img src={micro} width="32" height="32" alt="AddRepoImg" />
                        </button>
                        <button className="signin_button" onClick={() => window.open((import.meta.env.VITE_SELF_URI || window.env.VITE_SELF_URI) + 'grafana/login/generic_oauth')}>
                            <img src={grafana} width="32" height="32" alt="GrafanaOpenImg" />
                        </button>
                        <button className="user_menu_button" onClick={() => {
                            setCurrentNodeData(null)
                            openModal('UserMenu')
                        }}>
                            {login}
                        </button>
                        <button className="signout_button" onClick={signout}>
                            <img src={signout_icon} width="32" height="32" alt="signout" />
                        </button>
                    </>
                ) : (
                    <>
                        <button className="signin_button" onClick={() => openModal('signin')}>
                            <img src={signin_icon} width="32" height="32" alt="Signin" />
                        </button>
                    </>
                )}
            </div>
            <div>
                <BaseModal
                    modalName='Create Repo'
                    open={activeModal === 'createRepo'}
                    openModalType={previousModal == 'RegistryMenu' && currentPickRegistryData ? 'RegistryMenu' : undefined}    
                >
                    <CreateRepoForm/>
                </BaseModal>
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
                <BaseModal
                    modalName='User'
                    subName={user && !currentNodeData ? user.login : ( currentNodeData ? currentNodeData.login : '')}
                    open={activeModal === 'UserMenu'}
                >
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

                                    <div className='div_statistics'>
                                        {
                                            user.grafanaOrgId && (
                                                <>
                                                    <div className='div_statistics_text'>
                                                        Grafana Org Id:
                                                    </div>
                                                    <div className='div_statistics_text'>
                                                        {user.grafanaOrgId}
                                                    </div>
                                                </>
                                            )
                                        }
                                        <div className='div_statistics_text'>
                                            Grafana Org Name:
                                        </div>
                                        <div className='div_statistics_text'>
                                            {user.grafanaOrgName}
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            user && currentNodeData && currentNodeData.uuid != user.uuid && (
                                <>
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
                    </div>
                </BaseModal>
                <BaseModal
                    modalName='Verification'
                    subName={user && !currentNodeData ? user.login : ( currentNodeData ? currentNodeData.login : '')}
                    open={activeModal === 'verification'}
                    openModalType='UserMenu'
                >
                    <VerificationForm />
                </BaseModal>
                <BaseModal
                    modalName='Change Login'
                    subName={user && !currentNodeData ? user.login : ( currentNodeData ? currentNodeData.login : '')}
                    open={activeModal === 'changeLogin'}
                    openModalType='UserMenu'
                >
                    <ChangeLoginForm currentLogin={login}/>
                </BaseModal>
                <BaseModal
                    modalName='Change Password'
                    subName={user && !currentNodeData ? user.login : ( currentNodeData ? currentNodeData.login : '')}
                    open={activeModal === 'changePass'}
                    openModalType='UserMenu'
                >
                    <ChangePassForm />
                </BaseModal>
            </div>
        </header>
    );
}
