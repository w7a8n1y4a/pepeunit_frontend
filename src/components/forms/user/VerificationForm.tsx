import { useState } from 'react';
import { useGetVerificationUserLazyQuery } from '@rootTypes/composition-functions';
import Spinner from '../primitives/Spinner'
import '../form.css'

export default function VerificationForm() {
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoaderActive, setIsLoaderActive] = useState(false)
    
    const [getVerification] = useGetVerificationUserLazyQuery();

    const handleVerification = () => {
        setIsLoaderActive(true)
        localStorage.removeItem('verificationCode')

        getVerification().then(verificationCode => {
            if (verificationCode.data) { 
                setVerificationCode(verificationCode.data.getVerificationUser)
                
            } else {
                console.error('Ошибка получения кода:', verificationCode.error);
            }
            setIsLoaderActive(false)
        })
    };

    return (
        <> 
            {
                isLoaderActive && (<Spinner/>)
            }
            <p>
                1. Перейдите в бота <a style={{color: "#0077ff"}} href={import.meta.env.VITE_TG_BOT_URL} target="_blank">
                {import.meta.env.VITE_TG_BOT_NAME}</a>
            </p>
            <p>
                2. Введите команду <u>/verification</u>
            </p>
            <p>
                3. Введите данный код:
            </p>
            <div className='code_view'>
                {verificationCode}
            </div>
            <button className="button_main_action" onClick={handleVerification}>
                Сгенерировать одноразовый код
            </button>
        </>
    );
}