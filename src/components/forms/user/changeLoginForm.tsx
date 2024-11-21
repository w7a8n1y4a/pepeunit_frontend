import { useState, useEffect } from 'react';
import { ResultType } from '@rootTypes/resultEnum'
import { useUpdateUserMutation } from '@rootTypes/compositionFunctions';
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import isValidLogin from '@utils/isValidLogin'
import '../form.css'

import { useModalStore } from '@stores/baseStore';
import { useUserStore } from '@stores/userStore';

interface ChangeLoginFormProps {
    currentLogin: string | undefined
}

export default function ChangeLoginForm({ currentLogin }: ChangeLoginFormProps) {
    const { setActiveModal } = useModalStore();
    const { setUser } = useUserStore();

    const [login, setLogin] = useState(currentLogin);
    const [errorState, setErrorState] = useState({
        login: false,
    });
    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });
    
    useEffect(() => {
        setLogin(currentLogin)
    }, [currentLogin]);

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };

    const [updateUserMutation] = useUpdateUserMutation();

    const handleChangeLogin = () => {
        setIsLoaderActive(true)
        setResultData({
            ...resultData,
            message: null
        })


        updateUserMutation({
            variables: {
                login: login
            }
        }).then(updateUserData => {
            if (updateUserData.data) { 
                setUser(updateUserData.data.updateUser)
                
                setIsLoaderActive(false)
                setActiveModal(null)
            }
        })

    };

    return (
        <>
            {
                isLoaderActive && (<Spinner/>)
            }
            <div>
                <form>
                    <DefaultInput
                        id="login_change"
                        type="text"
                        placeholder="New Login"
                        value={login ? login : ''}
                        validateState={login}
                        onChange={setLogin}
                        validateFunc={isValidLogin}
                        setIsErrorExist={(hasError) => updateErrorState('login', hasError)}
                        setResultData={setResultData}
                    />
                </form>
            </div>
            <button className="button_main_action" onClick={handleChangeLogin} disabled={Object.values(errorState).some(isError => isError)}>
                Изменить
            </button>
        </>
    );
}