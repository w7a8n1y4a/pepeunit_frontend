import { useState } from 'react';
import { useGetVerificationUserLazyQuery } from '../../types/composition-functions';

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
            <a href={import.meta.env.VITE_TG_BOT_URL}target="_blank">
                <span>Telegram Bot</span>
            </a>
            <p>Введите код в боте: {verificationCode}</p>
            <button className="signin" onClick={handleVerification}>
                Сгенерировать одноразовый код
            </button>
        </>
    );
}