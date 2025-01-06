import './primitives.css'
import { useState, useEffect } from 'react';
import { UnitFirmwareUpdateStatus } from '@rootTypes/compositionFunctions'
import { useNodeStore } from '@stores/baseStore'
import {stringToFormat} from '@utils/stringToFormat'


interface UnitUpdateStateProps {
    targetVersion: string | null
}

export default function UnitUpdateState({ targetVersion }: UnitUpdateStateProps) {

    const [currentStatus, setCurrentStatus] = useState<string | null>(null);

    const { currentNodeData } = useNodeStore();
    
    useEffect(() => {
        if (currentNodeData && currentNodeData.__typename == "UnitType"){
            if (!currentNodeData.firmwareUpdateStatus && currentNodeData.currentCommitVersion == targetVersion) {
                setCurrentStatus(UnitFirmwareUpdateStatus.Success)
            } else if (!currentNodeData.currentCommitVersion && currentNodeData.currentCommitVersion != targetVersion) {
                setCurrentStatus('Need')
            } else if (!targetVersion && !currentNodeData.currentCommitVersion) {
                setCurrentStatus('No Data')
            } else {
                setCurrentStatus(currentNodeData.firmwareUpdateStatus)
            }
        }
      }, [currentNodeData, targetVersion]);

    return (
        currentNodeData && currentNodeData.__typename == "UnitType" && (
            <>    
                <div className='update_info'>
                    <div className="div_load_data_grid">
                        Update
                    </div>
                    <div className="div_load_data_grid">
                        Current
                    </div>
                    <div className="div_load_data_grid">
                        Target
                    </div>
                    <div className="div_load_data_grid">
                        {currentStatus && stringToFormat(currentStatus)}
                    </div>
                    <div className="div_load_data_grid">
                        {currentNodeData.currentCommitVersion ? currentNodeData.currentCommitVersion.substring(0, 8) : "-"}
                    </div>
                    <div className="div_load_data_grid">
                        {targetVersion ? targetVersion.substring(0, 8) : "-"}
                    </div>
                </div >
                {
                    currentNodeData.firmwareUpdateStatus == UnitFirmwareUpdateStatus.RequestSent && (
                        <div className='div_unit_message'>
                            Request time - {currentNodeData.lastFirmwareUpdateDatetime}
                        </div>
                    )
                }
                {
                    currentNodeData.firmwareUpdateError && (
                        <div className='div_unit_error_message'>
                            {currentNodeData.firmwareUpdateError}
                        </div>
                    )
                }
            </>
        )
    );
}