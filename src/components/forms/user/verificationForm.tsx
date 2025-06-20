import { useState } from 'react';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetVerificationUserLazyQuery } from '@rootTypes/compositionFunctions';
import Spinner from '@primitives/spinner'
import '../form.css'

export default function VerificationForm() {
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const [verificationCode, setVerificationCode] = useState('');
    const [getVerification] = useGetVerificationUserLazyQuery();

    const handleVerification = () => {
        runAsync(async () => {
            localStorage.removeItem('verificationCode')
            let result = await getVerification()
            if (result.data) { 
                setVerificationCode(result.data.getVerificationUser)
            }
        })
    };

    return (
        <> 
            {
                isLoaderActive && (<Spinner/>)
            }
            <p>
                1. Generate a unique Telegram verification link
            </p>
            <div className='code_view'>
                <a style={{color: "#0077ff"}} href={verificationCode} target="_blank">
                {verificationCode}</a>
            </div>
            <button className="button_main_action" onClick={handleVerification}>
                Generate
            </button>
        </>
    );
}