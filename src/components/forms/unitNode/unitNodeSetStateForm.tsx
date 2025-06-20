import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useSetStateUnitNodeInputMutation, } from '@rootTypes/compositionFunctions'
import { useState } from 'react';
import isValidString from '@utils/isValidString'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import '../form.css'

import { useNodeStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';


export default function UnitNodeSetStateForm() {
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { currentNodeData, setCurrentNodeData } = useNodeStore();

    const [errorState, setErrorState] = useState({
        name: false,
    });

    const [setStateUnitNodeInputMutation] = useSetStateUnitNodeInputMutation();

    const handleUnitNodeSetState = () => {
        runAsync(async () => {
            let result = await setStateUnitNodeInputMutation({
                variables: {
                    uuid: currentNodeData.uuid,
                    state: currentNodeData.state
                }
            })
            if (result.data){
                setHappy("State UnitNode success update")
            }
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
                    />
                </form>
            </div>
            <button className="button_main_action" onClick={handleUnitNodeSetState} disabled={Object.values(errorState).some(isError => isError)}>
                Update
            </button>
        </>
    );
}