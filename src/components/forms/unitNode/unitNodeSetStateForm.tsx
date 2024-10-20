import { ResultType } from '@rootTypes/resultEnum'
import { useSetStateUnitNodeInputMutation, } from '@rootTypes/compositionFunctions'
import { useState } from 'react';
import isValidString from '@utils/isValidString'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'

interface UnitNodeSetStateFormProps {
    currentNodeData: any;
    setCurrentNodeData: (repo: any | null) => void;
}

export default function UnitNodeSetStateForm({ currentNodeData, setCurrentNodeData }: UnitNodeSetStateFormProps) {

    const [errorState, setErrorState] = useState({
        name: false,
    });
    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });

    const [setStateUnitNodeInputMutation] = useSetStateUnitNodeInputMutation();

    const handleUnitNodeSetState = () => {
        setIsLoaderActive(true)
        setResultData({
            ...resultData,
            message: null
        })

        setStateUnitNodeInputMutation({
            variables: {
                uuid: currentNodeData.uuid,
                state: currentNodeData.state
            }
        }).then(UpdateUnitNodeData =>{
            if (UpdateUnitNodeData.data){
                setIsLoaderActive(false)
                setResultData({ type: ResultType.Happy, message: "Состояние UnitNode успешно обновлёно"})
            }
        }).catch(error => {
            setIsLoaderActive(false)
            setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
        })
    };

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            {
                currentNodeData.defaultBranch === null && (
                    <ResultQuery
                        resultData={{
                            type: ResultType.Angry,
                            message: 'Заполните ветку по умолчанию'
                        }}
                    />
                )
            }
            <div>
                <form>
                    <DefaultInput
                        id="state_set"
                        type="text"
                        placeholder="State"
                        value={currentNodeData.state}
                        validateState={currentNodeData.state}
                        onChange={(e) => setCurrentNodeData({
                                ...currentNodeData,
                                state: e
                            }
                        )}
                        validateFunc={isValidString}
                        setIsErrorExist={(hasError) => updateErrorState('name', hasError)}
                        setResultData={setResultData}
                    />
                </form>
            </div>
            <button className="button_main_action" onClick={handleUnitNodeSetState} disabled={Object.values(errorState).some(isError => isError)}>
                Обновить
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}