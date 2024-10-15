import { useState } from 'react';
import { ResultType } from '@rootTypes/resultEnum'
import { useUpdateUserMutation } from '@rootTypes/compositionFunctions';
import isValidPassword from '@utils/isValidPassword'
import isValidMatchPassword from '@utils/isValidMatchPassword'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'

export default function ChangePassForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorState, setErrorState] = useState({
        password: true,
        confirmPassword: true
    });
    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });

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
                password: password
            }
        }).then(updateUserData => {
            if (updateUserData.data) { 
                localStorage.setItem('user', JSON.stringify(updateUserData.data.updateUser));
                setIsLoaderActive(false)
                setResultData({ type: ResultType.Happy, message: 'Пароль успешно изменён'})
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