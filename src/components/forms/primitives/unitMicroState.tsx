import './primitives.css'
import { useState, useEffect } from 'react';
import { UnitStateType } from '@rootTypes/compositionFunctions'
import { useNodeStore } from '@stores/baseStore'
import byteConverter from '@utils/byteConverter'
import calculateFlashMem from '@utils/calculateFlashMem'
import formatMillis from '@utils/formatMillis'

export default function UnitMicroState() {

    const { currentNodeData } = useNodeStore();
    const [ currentState, setCurrentState] = useState<UnitStateType | null>(null);

    function getStateData() {
        let state: UnitStateType = currentNodeData.unitState
        return state
    }

    useEffect(() => {
        if (currentNodeData && currentNodeData.__typename == "UnitType" && currentNodeData.unitState){
            setCurrentState(getStateData())
        }
    }, [currentNodeData]);
      
    return (
        currentState && (
            <>
                {currentState.ifconfig && currentState.ifconfig.length > 0 && (
                    <div className='state_network'>
                        <div className='state_network_div'>
                            IP - {currentState.ifconfig[0]}
                        </div>
                        <div className='state_network_div'>
                            Sub - {currentState.ifconfig[1]}
                        </div>
                        <div className='state_network_div'>
                            Gate - {currentState.ifconfig[2]}
                        </div>
                        <div className='state_network_div'>
                            DNS - {currentState.ifconfig[3]}
                        </div>
                    </div>
                )}

                <div className='state_network'>
                    {currentState.freq && (
                        <div className='state_network_div'>
                            Freq {Math.round(currentState.freq)}
                        </div>
                    )}
                    {currentState.millis && (
                        <div className='state_network_div'>
                            Up - {formatMillis(currentState.millis)}
                        </div>
                    )}
                    {currentState.memAlloc && (
                        <div className='state_network_div'>
                            Alloc RAM {byteConverter(currentState.memAlloc)}
                        </div>
                    )}
                    {currentState.memFree && (
                        <div className='state_network_div'>
                            Free RAM {byteConverter(currentState.memFree)}
                        </div>
                    )}
                </div>
                
                {currentState.statvfs && currentState.statvfs.length == 10 && (
                        <div className='update_info'>
                            {
                                ['Total', 'Free', 'Used'].map((mem) => (
                                    <div className='div_load_data_grid'>
                                        {mem}
                                    </div>
                                ))
                            }
                            {
                                calculateFlashMem(currentState.statvfs).map((mem) => (
                                    <div className='div_load_data_grid'>
                                        {byteConverter(mem)}
                                    </div>
                                ))
                            }
                        </div>
                    )}
            </>
        )
    );
}