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
import AboutForm from '../forms/user/aboutForm';
import CreateRepoForm from '../forms/repo/createRepoForm'
import Spinner from '@primitives/spinner'
import { UserRole, useBlockUserMutation, useUnblockUserMutation, useDeleteUserCookiesMutation, useGetConvertTomlToMdLazyQuery } from '@rootTypes/compositionFunctions'
import './header.css'
import { useState, useCallback, useReducer, useEffect, useRef } from 'react';

import { useModalStore, useNodeStore, usePickRegistryStore } from '@stores/baseStore';
import useModalHandlers from '@handlers/useModalHandlers';
import { useUserStore } from '@stores/userStore';
import { TELEGRAM_BOT_ENABLE_FLAG, useBackendInfoStore } from '@stores/backendInfoStore';
import { useErrorStore } from '@stores/errorStore';
import micro from '/images/micro.svg'
import grafana from '/images/grafana.svg'
import SearchMenu from '../searchMenu/searchMenu';

export default function Header(){
    const { setHappy, setError } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { activeModal } = useModalStore();
    const { openModal, closeModal, previousModal } = useModalHandlers();
    const { currentNodeData, setCurrentNodeData } = useNodeStore();
    const { setCurrentPickRegistryData, currentPickRegistryData } = usePickRegistryStore();
    const { user, clearUser } = useUserStore();
    const { backendInfo } = useBackendInfoStore();
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const [login, setLogin ] = useState(user?.login)
    const isTelegramVerificationEnabled = backendInfo?.feature_flags?.[TELEGRAM_BOT_ENABLE_FLAG] !== false;

    const [blockUser] = useBlockUserMutation();
    const [unblockUser] = useUnblockUserMutation();
    const [deleteUserCookies] = useDeleteUserCookiesMutation();
    const [getConvertTomlToMd] = useGetConvertTomlToMdLazyQuery();
    const fileInputRef = useRef<HTMLInputElement>(null);

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
    }, [clearUser, closeModal, deleteUserCookies, runAsync]);

    const handleBlockUser = () => {
        runAsync(async () => {
            const result = await blockUser({
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
            const result = await unblockUser({
                variables: {
                    uuid: currentNodeData.uuid,
                }
            })
            if (result.data){
                setHappy("User " + currentNodeData.login + " success unblocked")
            }
        })
    };

    const openTomlPicker = () => {
        fileInputRef.current?.click();
    };

    const handleTomlSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        runAsync(async () => {
            try {
                const result = await getConvertTomlToMd({
                    variables: {
                        file: file
                    }
                });

                if (result.errors && result.errors.length) {
                    setError(result);
                    return;
                }

                const markdown = result.data?.getConvertTomlToMd;

                if (markdown) {
                    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'README.md');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    setHappy('README.md generated');
                }
            } finally {
                event.target.value = '';
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
                                    {isTelegramVerificationEnabled && (
                                        <button className="button_telegram" onClick={() => openModal('verification')}>
                                            Telegram Verification
                                        </button>
                                    )}

                                    <button className="button_readme" onClick={openTomlPicker}>
                                        Generate README.md
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept=".toml"
                                        style={{ display: 'none' }}
                                        onChange={handleTomlSelected}
                                    />

                                    <div className="buttons_row">
                                        <button className="button_open_alter" onClick={() => openModal('changeLogin')}>
                                            Change Login
                                        </button>
                                        <button className="button_open_alter" onClick={() => openModal('changePass')}>
                                            Change Password
                                        </button>
                                    </div>


                                    <button className="button_open_alter" onClick={() => openModal('about')}>
                                        About
                                    </button>
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
                <BaseModal
                    modalName='About Instance'
                    open={activeModal === 'about'}
                    openModalType='UserMenu'
                >
                    <AboutForm />
                </BaseModal>
            </div>
        </header>
    );
}
