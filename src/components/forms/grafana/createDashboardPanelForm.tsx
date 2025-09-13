import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useCreateDashboardPanelMutation, CreateDashboardPanelMutationVariables, DashboardPanelTypeEnum } from '@rootTypes/compositionFunctions'
import { useState } from 'react';
import isValidLogin from '@utils/isValidLogin'
import DefaultInput from '@primitives/defaultInput'
import Spinner from '@primitives/spinner'
import '../form.css'

import { useModalStore, useNodeStore } from '@stores/baseStore';


export default function CreateDashboardPanelForm() {
    const { isLoaderActive, runAsync } = useAsyncHandler();
    const { setActiveModal } = useModalStore();
    const { currentNodeData } = useNodeStore();
    
    const [dashboardPanelTitle, setDashboardPanelTitle] = useState('');
    const [dashboardPanelType, setDashboardPanelType] = useState<DashboardPanelTypeEnum | null>(null);

    const [errorState, setErrorState] = useState({
        title: true,
    });

    const updateErrorState = (field: keyof typeof errorState, hasError: boolean) => {
        setErrorState(prevState => ({
            ...prevState,
            [field]: hasError
        }));
    };
    
    const [createDashboardPanelMutation] = useCreateDashboardPanelMutation();

    const handleCreateDashboardPanel = () => {
        if (dashboardPanelType){
            runAsync(async () => {
                let dashboardPanelVariables: CreateDashboardPanelMutationVariables = {
                    dashboardUuid: currentNodeData.uuid,
                    title: dashboardPanelTitle,
                    type: dashboardPanelType
                }

                let result = await createDashboardPanelMutation({
                    variables: dashboardPanelVariables
                })

                if (result.data){
                    setActiveModal('panelManagment')
                }
            })
        }

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
                        placeholder="Title"
                        value={dashboardPanelTitle}
                        validateState={dashboardPanelTitle}
                        onChange={setDashboardPanelTitle}
                        validateFunc={isValidLogin}
                        setIsErrorExist={(hasError) => updateErrorState('title', hasError)}
                    />
                    <select id='base_enum' onChange={(e) => {
                            setDashboardPanelType(e.target.value as DashboardPanelTypeEnum)
                        }}
                    >
                        <option value="" disabled selected>Pick Type</option>

                        {   
                            Object.values(DashboardPanelTypeEnum).map(
                                (item: string) => (
                                    <option value={item}>
                                        {item}
                                    </option>
                                )
                            )
                        }
                    </select>
                </form>
            </div>
            <button className="button_main_action" onClick={handleCreateDashboardPanel} disabled={Object.values(errorState).some(isError => isError)}>
                Create
            </button>
        </>
    );
}