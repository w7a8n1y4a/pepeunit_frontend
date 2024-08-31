import '../form.css';
import attention_img from '/images/attention.svg'
import { useState, useEffect, useRef } from 'react';

interface DefaultInputProps {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    validateState: any;
    onChange: (value: string) => void;
    validateFunc: (value: any) => string | null;
    setIsErrorExist: (value: boolean) => void
    errorQuery: (value: string | null) => void;
}

export default function DefaultInput({id, type, placeholder, value, validateState, onChange, validateFunc, setIsErrorExist, errorQuery}: DefaultInputProps) {
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const firstRender = useRef(true);

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
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value)
                    errorQuery(null)
                }}
            />
            {
                errorMessage !== null ? (
                    <div className="info_error">
                        <img src={attention_img} width="24" height="24" alt="signout" />
                        <div className="info_error_message">
                            {errorMessage}
                        </div>
                    </div>
                ) : (<></>)
            }
        </div>
    );
}