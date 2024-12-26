import { useState } from 'react';
import { useResultHandler } from '@rootTypes/useResultHandler';
import ResultQuery from '@primitives/resultQuery'
import { useGetVerificationUserLazyQuery } from '@rootTypes/compositionFunctions';
import Spinner from '@primitives/spinner'
import '../form.css'

export default function VerificationForm() {
    const { resultData, handleError } = useResultHandler();

    const [verificationCode, setVerificationCode] = useState('');
    const [isLoaderActive, setIsLoaderActive] = useState(false)
    
    const [getVerification] = useGetVerificationUserLazyQuery();

    const handleVerification = () => {
        setIsLoaderActive(true)
        localStorage.removeItem('verificationCode')

        getVerification().then(verificationCode => {
            if (verificationCode.data) { 
                setVerificationCode(verificationCode.data.getVerificationUser)
            }
        }).catch(error => {
            handleError(error);
        }).finally(() => {
            setIsLoaderActive(false);
        });
    };

    return (
        <> 
            {
                isLoaderActive && (<Spinner/>)
            }
            <p>
                1. Сгенерируйте уникальную ссылку
            </p>
            <div className='code_view'>
                <a style={{color: "#0077ff"}} href={verificationCode} target="_blank">
                {verificationCode}</a>
            </div>
            <button className="button_main_action" onClick={handleVerification}>
                Сгенерировать
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}