import { useResultHandler } from '@rootTypes/useResultHandler';
import { UnitType, useGetUnitEnvLazyQuery, useUpdateUnitEnvMutation } from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'


interface CreateUnitFormProps {
    currentNodeData: UnitType;
}

export default function UpdateUnitEnvForm({ currentNodeData }:CreateUnitFormProps) {
    const { resultData, handleError, handleSuccess } = useResultHandler();

    const [currentUnitEnv, setCurrentUnitEnv] = useState<Record<string, string | number> | null>(null)

    const [isLoaderActive, setIsLoaderActive] = useState(false)
    
    const [getUnitEnv] = useGetUnitEnvLazyQuery()
    const [updateUnitEnv] = useUpdateUnitEnvMutation();

    const handleCreateUnit = () => {
        setIsLoaderActive(true)
        
        updateUnitEnv({
            variables: {
                uuid: currentNodeData.uuid,
                envJsonStr: JSON.stringify(currentUnitEnv)
            }
        }).then(result => {
            if (result.data){
                handleSuccess("ENV success update")

                getUnitEnv({
                    variables: {
                        uuid: currentNodeData.uuid,
                    }
                }).then(resultUnitEnv => {
                    if (resultUnitEnv.data?.getUnitEnv){
                        setCurrentUnitEnv(JSON.parse(resultUnitEnv.data.getUnitEnv))
                    }
                }).catch(error => {
                    handleError(error);
                })
            }
        }).catch(error => {
            handleError(error);
        }).finally(() => {
            setIsLoaderActive(false);
        });
    };

    useEffect(() => {
        getUnitEnv({
            variables: {
                uuid: currentNodeData.uuid,
            }
        }).then(resultUnitEnv => {
                if (resultUnitEnv.data?.getUnitEnv){
                    setCurrentUnitEnv(JSON.parse(resultUnitEnv.data.getUnitEnv))
                }
            }
        )
    }, [currentNodeData]);

    const handleInputChange = (key: string, value: string) => {
        const parsedValue = isNaN(Number(value)) ? value : Number(value);

        if (currentUnitEnv) {
            setCurrentUnitEnv({
                ...currentUnitEnv,
                [key]: parsedValue,
            });
        }
    };

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            <div className="unit-env-form-container">
                <div className="unit-env-form">
                    {currentUnitEnv &&
                        Object.entries(currentUnitEnv).map(([key, value]) => (
                            <div key={key}>
                                <label>{key}</label>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                />
                            </div>
                        ))}
                </div>
            </div>
            <button className="button_main_action" onClick={handleCreateUnit}>
                Обновить
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}