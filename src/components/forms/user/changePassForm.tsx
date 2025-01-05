import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useState } from 'react';
import { useUpdateUserMutation } from '@rootTypes/compositionFunctions';
import isValidPassword from '@utils/isValidPassword'
import isValidMatchPassword from '@utils/isValidMatchPassword'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'

import { useUserStore } from '@stores/userStore';

export default function ChangePassForm() {
    const { resultData, setResultData, handleError, handleSuccess } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

    const [password, setPassword] = useState('');']'
    const [confirmPassword, setConfirmPassword] = useState('');

    const { setUser } = useUserStore();

    const [errorState, setErrorState] = useState({
        password: true,
        confirmPassword: true
    });

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
                    password: password
                }
            })
            if (result.data) { 
                setUser(result.data.updateUser)
                handleSuccess("Pass success update")
            }
        })
    };

    return (
        <>
            <div>
                {
                    isLoaderActive && (<Spinner/>)
                }
                <form>
                    <DefaultInput
                        id="password_new_reg"
                        type="password"
                        placeholder="Password"
                        value={password}
                        validateState={password}
                        onChange={setPassword}
                        validateFunc={isValidPassword}
                        setIsErrorExist={(hasError) => updateErrorState('password', hasError)}
                        setResultData={setResultData}
                    />
                    <DefaultInput
                        id="confirm_password_new_reg"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        validateState={{password: password, confirmPassword: confirmPassword}}
                        onChange={setConfirmPassword}
                        validateFunc={isValidMatchPassword}
                        setIsErrorExist={(hasError) => updateErrorState('confirmPassword', hasError)}
                        setResultData={setResultData}
                    />
                </form>
            </div>
            <button className="button_main_action" onClick={handleChangeLogin} disabled={Object.values(errorState).some(isError => isError)}>
                Изменить
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}