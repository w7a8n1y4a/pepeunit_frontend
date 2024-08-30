import '../form.css';
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
}

export default function DefaultInput({ value, validateState, onChange, validateFunc, setIsErrorExist, id, type, placeholder}: DefaultInputProps) {
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
                onChange={(e) => onChange(e.target.value)}
            />
            {
                errorMessage !== null ? (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                ) : (<></>)
            }
        </div>
    );
}