import './primitives.css'
import { useNodeStore } from '@stores/baseStore'
import byteConverter from '@utils/byteConverter'
import calculateFlashMem from '@utils/calculateFlashMem'
import formatMillis from '@utils/formatMillis'


export default function UnitMicroState() {

    const { currentNodeData } = useNodeStore();

    return (
        currentNodeData?.unitState && (
            <>
                {currentNodeData.unitState.ifconfig && currentNodeData.unitState.ifconfig.length > 0 && (
                    <div className='state_network'>
                        <div className='state_network_div'>
                            IP - {currentNodeData.unitState.ifconfig[0]}
                        </div>
                        <div className='state_network_div'>
                            Sub - {currentNodeData.unitState.ifconfig[1]}
                        </div>
                        <div className='state_network_div'>
                            Gate - {currentNodeData.unitState.ifconfig[2]}
                        </div>
                        <div className='state_network_div'>
                            DNS - {currentNodeData.unitState.ifconfig[3]}
                        </div>
                    </div>
                )}

                <div className='state_network'>
                    {currentNodeData.unitState.freq && (
                        <div className='state_network_div'>
                            Freq {Math.round(currentNodeData.unitState.freq)}
                        </div>
                    )}
                    {currentNodeData.unitState.millis && (
                        <div className='state_network_div'>
                            Up - {formatMillis(currentNodeData.unitState.millis)}
                        </div>
                    )}
                    {currentNodeData.unitState.memAlloc && (
                        <div className='state_network_div'>
                            Alloc RAM {byteConverter(currentNodeData.unitState.memAlloc)}
                        </div>
                    )}
                    {currentNodeData.unitState.memFree && (
                        <div className='state_network_div'>
                            Free RAM {byteConverter(currentNodeData.unitState.memFree)}
                        </div>
                    )}
                </div>
                
                {currentNodeData.unitState.statvfs && currentNodeData.unitState.statvfs.length == 10 && (
                        <div className='update_info'>
                            {
                                ['Total', 'Free', 'Used'].map((mem) => (
                                    <div className='div_load_data_grid'>
                                        {mem}
                                    </div>
                                ))
                            }
                            {
                                calculateFlashMem(currentNodeData.unitState.statvfs).map((mem) => (
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