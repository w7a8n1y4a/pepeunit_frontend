import { useState } from 'react';
import { ResultType } from '../../../types/resultEnum'
import { useUpdateUserMutation } from '../../../types/composition-functions';
import DefaultInput from '../primitives/DefaultInput'
import Spinner from '../primitives/Spinner'
import ResultQuery from '../primitives/ResultQuery'
import isValidLogin from '../../../utils/isValidLogin'
import '../form.css'

interface ChangeLoginFormProps {
    setActiveModal: (show: string | null) => void;
}

export default function ChangeLoginForm({ setActiveModal }: ChangeLoginFormProps) {
    const user = localStorage.getItem('user');
    const loginStorage = user ? JSON.parse(user).login : '';

    const [login, setLogin] = useState(loginStorage);
    const [errorState, setErrorState] = useState({
        login: true,
        password: true,
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
                login: login
            }
        }).then(updateUserData => {
            if (updateUserData.data) { 
                localStorage.setItem('user', JSON.stringify(updateUserData.data.updateUser));
                
                setResultData({ type: ResultType.Happy, message: "Логин успешно обновлён"})
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
                        value={login}
                        validateState={login}
                        onChange={setLogin}
                        validateFunc={isValidLogin}
                        setIsErrorExist={(hasError) => updateErrorState('login', hasError)}
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