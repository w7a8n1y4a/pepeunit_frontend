import { ResultType } from '@rootTypes/resultEnum'
import { UnitType, useGetUnitEnvLazyQuery, useUpdateUnitEnvMutation } from '@rootTypes/compositionFunctions'
import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'


interface CreateUnitFormProps {
    currentNodeData: UnitType;
}

export default function UpdateUnitEnvForm({ currentNodeData }:CreateUnitFormProps) {

    const [currentUnitEnv, setCurrentUnitEnv] = useState<Record<string, string | number> | null>(null)

    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });
    
    const [getUnitEnv] = useGetUnitEnvLazyQuery()
    const [updateUnitEnv] = useUpdateUnitEnvMutation();

    const handleCreateUnit = () => {
        setIsLoaderActive(true)
        setResultData({
            ...resultData,
            message: null
        })
        
        updateUnitEnv(
            {
                variables: {
                    uuid: currentNodeData.uuid,
                    envJsonStr: JSON.stringify(currentUnitEnv)
                }
            }
        ).then(result =>{
            if (result.data){
                setIsLoaderActive(false)
                setResultData({ type: ResultType.Happy, message: "Env успешно обновлён"})

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
            }
        }).catch(error => {
            setIsLoaderActive(false)
            setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
        })
    };

    useEffect(() => {
        getUnitEnv({
            variables: {
                uuid: currentNodeData.uuid,
            }
        }).then(resultUnitEnv => {
                if (resultUnitEnv.data?.getUnitEnv){
                    console.log(JSON.parse(resultUnitEnv.data.getUnitEnv))
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