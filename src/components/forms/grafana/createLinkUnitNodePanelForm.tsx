import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useLinkUnitNodeToPanelMutation } from '@rootTypes/compositionFunctions'
import { useState } from 'react';
import Spinner from '@primitives/spinner'
import useModalHandlers from '@handlers/useModalHandlers';
import '../form.css'

import {  useDashboardPanelStore, useUnitNodeStore } from '@stores/baseStore';


export default function CreateLinkUnitNodePanelForm() {
    const { isLoaderActive, runAsync } = useAsyncHandler();
    const { openModal } = useModalHandlers();

    const [isLastData, setIsLastData] = useState(false);
    const [isForcedToJson, setIsForcedToJson] = useState(false);

    
    const { currentDashboardPanelData } = useDashboardPanelStore();
    const { currentUnitNodeData, setCurrentUnitNodeData } = useUnitNodeStore();

    const [linkUnitNodeToPanelMutation] = useLinkUnitNodeToPanelMutation();

    const handleCreateLink = () => {
        runAsync(async () => {
            let result = await linkUnitNodeToPanelMutation({
                variables: {
                    dashboardPanelsUuid: currentDashboardPanelData.uuid,
                    unitNodeUuid: currentUnitNodeData,
                    isLastData: isLastData,
                    isForcedToJson: isForcedToJson
                }
            })
            if (result.data){
                setCurrentUnitNodeData(null)
                openModal('unitNodesPanel')
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
                    <div className='toggle_container'>
                        <label className="toggle">
                            <input 
                                type="checkbox" 
                                checked={isLastData}
                                onChange={(e) => { setIsLastData(e.target.checked)}
                                } 
                            />
                            <span className="slider"></span>
                        </label>
                        <div className="toggle_text">
                            Only last value ?
                        </div>
                    </div>

                    <div className='toggle_container'>
                        <label className="toggle">
                            <input 
                                type="checkbox" 
                                checked={isForcedToJson}
                                onChange={(e) => { setIsForcedToJson(e.target.checked)}
                                } 
                            />
                            <span className="slider"></span>
                        </label>
                        <div className="toggle_text">
                            Value str to json ?
                        </div>
                    </div>
                </form>
            </div>
            <button className="button_main_action" onClick={handleCreateLink}>
                Link
            </button>
        </>
    );
}