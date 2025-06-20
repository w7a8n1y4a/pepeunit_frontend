import attention_img from '/images/attention.svg'
import { RefObject, useState, useEffect, useRef } from 'react';

import { useErrorStore } from '@stores/errorStore';

import './primitives.css'

interface DefaultInputProps {
    id: string;
    type: string;
    inputRef?: RefObject<HTMLInputElement>;
    placeholder: string;
    value: string;
    validateState: any;
    onChange: (value: string) => void;
    validateFunc: (value: any) => string | null;
    setIsErrorExist: (value: boolean) => void
}

export default function DefaultInput({id, type, inputRef, placeholder, value, validateState, onChange, validateFunc, setIsErrorExist}: DefaultInputProps) {
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const firstRender = useRef(true);

    const { clearError } = useErrorStore();

    useEffect(() => {
        const validation = validateFunc(validateState);

        if (!firstRender.current) {
            if ((validation === null) !== isValid) {
                setIsValid(validation === null);
                setErrorMessage(validation)
                setIsErrorExist(validation !== null);
            }
        } else {
            firstRender.current = false;
        }
    }, [validateState, validateFunc, isValid, setIsErrorExist]);

    return (
        <div>
            <input
                id={id}
                type={type}
                ref={inputRef}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value)
                    clearError()
                }}
            />
            {
                errorMessage && (
                    <div className="info_error">
                        <img src={attention_img} width="24" height="24" alt="signout" />
                        <div className="info_error_message">
                            {errorMessage}
                        </div>
                    </div>
                )
            }
        </div>
    );
}