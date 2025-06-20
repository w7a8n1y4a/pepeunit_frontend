import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useState, useEffect } from 'react';
import { useUpdateUserMutation } from '@rootTypes/compositionFunctions';
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import isValidLogin from '@utils/isValidLogin'
import '../form.css'

import { useUserStore } from '@stores/userStore';
import { useErrorStore } from '@stores/errorStore';


interface ChangeLoginFormProps {
    currentLogin: string | undefined
}

export default function ChangeLoginForm({ currentLogin }: ChangeLoginFormProps) {
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { setUser } = useUserStore();

    const [login, setLogin] = useState(currentLogin);
    const [errorState, setErrorState] = useState({
        login: false,
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
        runAsync(async () => {

            let result = await updateUserMutation({
                variables: {
                    login: login
                }
            })
            if (result.data) { 
                setUser(result.data.updateUser)
                setHappy("New Login success set")
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
                    />
                </form>
            </div>
            <button className="button_main_action" onClick={handleChangeLogin} disabled={Object.values(errorState).some(isError => isError)}>
                Change
            </button>
        </>
    );
}