import { useState } from 'react';
import { useGetVerificationUserLazyQuery } from '../../types/composition-functions';
import './form.css'

export default function VerificationForm() {
    const [verificationCode, setVerificationCode] = useState('');
    
    const [getVerification] = useGetVerificationUserLazyQuery();

    const handleVerification = () => {
        localStorage.removeItem('verificationCode')

        getVerification().then(verificationCode => {
            if (verificationCode.data) { 
                setVerificationCode(verificationCode.data.getVerificationUser)
            } else {
                console.error('Ошибка получения кода:', verificationCode.error);
            }
        })
    };

    return (
        <> 
            <p>
                1. Перейдите в бота <a href={import.meta.env.VITE_TG_BOT_URL} target="_blank">
                    <u>{import.meta.env.VITE_TG_BOT_NAME}</u></a>
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