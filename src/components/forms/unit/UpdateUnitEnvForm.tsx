import { ResultType } from '../../../types/resultEnum'
import { UnitType, useGetUnitEnvLazyQuery, useUpdateUnitEnvMutation } from '../../../types/composition-functions'
import { useState, useEffect } from 'react';
import Spinner from '../primitives/Spinner'
import ResultQuery from '../primitives/ResultQuery'
import '../form.css'


interface CreateUnitFormProps {
    currentUnitData: UnitType;
}

export default function UpdateUnitEnvForm({ currentUnitData }:CreateUnitFormProps) {

    const [currentUnitEnv, setCurrentUnitEnv] = useState<Record<string, string> | null>(null)

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
                    uuid: currentUnitData.uuid,
                    envJsonStr: JSON.stringify(currentUnitEnv)
                }
            }
        ).then(result =>{
            if (result.data){
                setIsLoaderActive(false)
                setResultData({ type: ResultType.Happy, message: "Env успешно обновлён"})

                getUnitEnv({
                    variables: {
                        uuid: currentUnitData.uuid,
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
                uuid: currentUnitData.uuid,
            }
        }).then(resultUnitEnv => {
                if (resultUnitEnv.data?.getUnitEnv){
                    console.log(JSON.parse(resultUnitEnv.data.getUnitEnv))
                    setCurrentUnitEnv(JSON.parse(resultUnitEnv.data.getUnitEnv))
                }
            }
        )
    }, [currentUnitData]);

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
                Создать
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}