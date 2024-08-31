import { useState } from 'react';
import { ResultType } from '../../../types/resultEnum'
import { useUpdateUserMutation } from '../../../types/composition-functions';
import isValidPassword from '../../../utils/isValidPassword'
import isValidMatchPassword from '../../../utils/isValidMatchPassword'
import DefaultInput from '../primitives/DefaultInput'
import Spinner from '../primitives/Spinner'
import ResultQuery from '../primitives/ResultQuery'
import '../form.css'

interface ChangePassFormProps {
    setActiveModal: (show: string | null) => void;
}

export default function ChangePassForm({ setActiveModal }: ChangePassFormProps) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorState, setErrorState] = useState({
        login: true,
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
            <button className="button_main_action" onClick={handleChangeLogin}>
                Изменить
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}