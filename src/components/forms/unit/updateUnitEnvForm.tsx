import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetUnitEnvLazyQuery, useUpdateUnitEnvMutation, useResetUnitEnvMutation } from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'
import '../form.css'

import { useNodeStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';


export default function UpdateUnitEnvForm() {
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { currentNodeData } = useNodeStore();

    // Draft values are stored as strings to avoid breaking user input like "1." while typing.
    const [currentUnitEnv, setCurrentUnitEnv] = useState<Record<string, string> | null>(null)

    const [getUnitEnv] = useGetUnitEnvLazyQuery()
    const [updateUnitEnv] = useUpdateUnitEnvMutation();
    const [resetUnitEnv] = useResetUnitEnvMutation();

    const stringifyEnvValue = (value: unknown): string => {
        if (value === null) return "null";
        if (typeof value === "string") return value;
        if (typeof value === "number" || typeof value === "boolean") return String(value);
        try {
            return JSON.stringify(value);
        } catch {
            return String(value);
        }
    };

    const parseEnvValue = (value: string): string | number | null => {
        const trimmed = value.trim();

        // 1) null -> JSON null
        if (trimmed.toLowerCase() === "null") return null;

        // 2) numbers (including decimals with dot)
        // Examples: 123, -123, 1.4321, 1., 0.5
        const isNumeric = /^-?(?:\d+\.?\d*|\.\d+)$/.test(trimmed);
        if (isNumeric) return Number(trimmed);

        // 3) everything else -> string
        return value;
    };

    const handleUpdateUnitEnv = () => {
        runAsync(async () => {
            const envForSave = currentUnitEnv
                ? Object.fromEntries(
                    Object.entries(currentUnitEnv).map(([key, value]) => [key, parseEnvValue(value)])
                )
                : null;

            let result = await updateUnitEnv({
                variables: {
                    uuid: currentNodeData.uuid,
                    envJsonStr: JSON.stringify(envForSave)
                }
            })
            if (result.data){
                setHappy("ENV success update")

                let resultUnitEnv = await getUnitEnv({
                    variables: {
                        uuid: currentNodeData.uuid,
                    }
                })
                if (resultUnitEnv.data?.getUnitEnv){
                    const parsed = JSON.parse(resultUnitEnv.data.getUnitEnv) as Record<string, unknown>;
                    setCurrentUnitEnv(
                        Object.fromEntries(Object.entries(parsed).map(([k, v]) => [k, stringifyEnvValue(v)]))
                    )
                }
            }
        })
    };

    const handleResetUnitEnv = () => {
        runAsync(async () => {
            let result = await resetUnitEnv({
                variables: {
                    uuid: currentNodeData.uuid,
                }
            })
            if (result.data){
                setHappy("ENV success reset")
                let resultUnitEnv = await getUnitEnv({
                    variables: {
                        uuid: currentNodeData.uuid,
                    }
                })
                if (resultUnitEnv.data?.getUnitEnv){
                    const parsed = JSON.parse(resultUnitEnv.data.getUnitEnv) as Record<string, unknown>;
                    setCurrentUnitEnv(
                        Object.fromEntries(Object.entries(parsed).map(([k, v]) => [k, stringifyEnvValue(v)]))
                    )
                }else{
                    setCurrentUnitEnv(null)
                }
            }
        })
    };

    useEffect(() => {
        if (currentNodeData.__typename == "UnitType"){
            runAsync(async () => {
                let result = await getUnitEnv({
                    variables: {
                        uuid: currentNodeData.uuid,
                    }
                })
                if (result.data?.getUnitEnv){
                    const parsed = JSON.parse(result.data.getUnitEnv) as Record<string, unknown>;
                    setCurrentUnitEnv(
                        Object.fromEntries(Object.entries(parsed).map(([k, v]) => [k, stringifyEnvValue(v)]))
                    )
                }else{
                    setCurrentUnitEnv(null)
                }
            })
        }
    }, [currentNodeData]);

    const handleInputChange = (key: string, value: string) => {
        if (currentUnitEnv) {
            setCurrentUnitEnv({
                ...currentUnitEnv,
                [key]: value,
            });
        }
    };

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            {
                currentUnitEnv && 
                <>
                    <div className="unit-env-form-container">
                        <div className="unit-env-form">
                            {
                                currentUnitEnv &&  Object.entries(currentUnitEnv).map(([key, value]) => (
                                    <div key={key}>
                                        <label>{key}</label>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <button className="button_main_action" onClick={handleUpdateUnitEnv}>
                        Update
                    </button>
                    <button className="button_core_function" onClick={handleResetUnitEnv}>
                        Reset
                    </button>
                </>
            }
        </>
    );
}