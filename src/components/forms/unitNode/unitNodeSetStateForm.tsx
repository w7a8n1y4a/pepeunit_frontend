import { ResultType } from '@rootTypes/resultEnum'
import { useResultHandler } from '@rootTypes/useResultHandler';
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
    const { resultData, setResultData, handleError, handleSuccess } = useResultHandler();

    const [errorState, setErrorState] = useState({
        name: false,
    });
    const [isLoaderActive, setIsLoaderActive] = useState(false)

    const [setStateUnitNodeInputMutation] = useSetStateUnitNodeInputMutation();

    const handleUnitNodeSetState = () => {
        setIsLoaderActive(true)

        setStateUnitNodeInputMutation({
            variables: {
                uuid: currentNodeData.uuid,
                state: currentNodeData.state
            }
        }).then(UpdateUnitNodeData =>{
            if (UpdateUnitNodeData.data){
                handleSuccess("State UnitNode success update")
            }
        }).catch(error => {
            handleError(error);
        }).finally(() => {
            setIsLoaderActive(false);
        });
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