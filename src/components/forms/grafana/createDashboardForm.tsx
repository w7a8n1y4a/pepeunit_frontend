import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useCreateDashboardMutation, CreateDashboardMutationVariables } from '@rootTypes/compositionFunctions'
import { useState } from 'react';
import isValidLogin from '@utils/isValidLogin'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import '../form.css'

import { useModalStore, useNodeStore } from '@stores/baseStore';


export default function CreateDashboardForm() {
    const { isLoaderActive, runAsync } = useAsyncHandler();
    const { setActiveModal } = useModalStore();
    const { setCurrentNodeData } = useNodeStore();
    
    const [dashboardName, setDashboardName] = useState('');

    const [errorState, setErrorState] = useState({
        name: true,
    });

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };
    
    const [createDashboardMutation] = useCreateDashboardMutation();

    const handleCreateDashboard = () => {
        runAsync(async () => {
            let repoVariables: CreateDashboardMutationVariables = {
                name: dashboardName,
            }

            let result = await createDashboardMutation({
                variables: repoVariables
            })

            if (result.data){
                let newDashboard = result.data.createDashboard
                setCurrentNodeData(newDashboard)
                setActiveModal('DashboardMenu')
            }
        })
    };

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            <div>
                <form>
                    <DefaultInput
                        id="name_set"
                        type="text"
                        placeholder="Name"
                        value={dashboardName}
                        validateState={dashboardName}
                        onChange={setDashboardName}
                        validateFunc={isValidLogin}
                        setIsErrorExist={(hasError) => updateErrorState('name', hasError)}
                    />
                </form>
            </div>
            <button className="button_main_action" onClick={handleCreateDashboard} disabled={Object.values(errorState).some(isError => isError)}>
                Create
            </button>
        </>
    );
}