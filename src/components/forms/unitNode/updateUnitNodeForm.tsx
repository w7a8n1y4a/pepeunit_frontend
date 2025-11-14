import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { VisibilityLevel, UnitNodeTypeEnum, useUpdateUnitNodeMutation} from '@rootTypes/compositionFunctions'
import Spinner from '@primitives/spinner'
import '../form.css'

import { useErrorStore } from '@stores/errorStore';
import { useNodeStore } from '@stores/baseStore';


export default function UpdateUnitNodeForm() {
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { currentNodeData, setCurrentNodeData } = useNodeStore();

    const [updateUnitNodeMutation] = useUpdateUnitNodeMutation();

    const handleUpdateUnitNode = () => {
        runAsync(async () => {
            let result = await updateUnitNodeMutation({
                variables: {
                    uuid: currentNodeData.uuid,
                    visibilityLevel: currentNodeData.visibilityLevel,
                    isRewritableInput: currentNodeData.type == UnitNodeTypeEnum.Input ? currentNodeData.isRewritableInput : null,
                    maxConnections: currentNodeData.maxConnections
                }
            })
            if (result.data){
                setHappy("UnitNode success update")
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
                    <select id='base_enum' value={currentNodeData.visibilityLevel} onChange={(e) => 
                            setCurrentNodeData({
                                ...currentNodeData,
                                visibilityLevel: e.target.value as VisibilityLevel
                            })
                        }
                    >
                        <option value={VisibilityLevel.Public}>Public</option>
                        <option value={VisibilityLevel.Internal}>Internal</option>
                        <option value={VisibilityLevel.Private}>Private</option>
                    </select>
                    <div className='input_container'>
                        <label htmlFor="max_connections">
                            Max Connections
                        </label>
                        <input
                            id="max_connections"
                            type="number"
                            min={0}
                            value={currentNodeData.maxConnections}
                            onChange={(e) =>
                                setCurrentNodeData({
                                    ...currentNodeData,
                                    maxConnections: Math.max(0, Number.parseInt(e.target.value || '0', 10))
                                })
                            }
                        />
                    </div>
                    {
                        currentNodeData.type == UnitNodeTypeEnum.Input && (
                            <div className='toggle_container'>
                                <label className="toggle">
                                    <input 
                                        type="checkbox" 
                                        checked={ currentNodeData.isRewritableInput }
                                        onChange={(e) => setCurrentNodeData({
                                                    ...currentNodeData,
                                                    isRewritableInput: e.target.checked
                                                }
                                            )
                                        } 
                                    />
                                    <span className="slider"></span>
                                </label>
                                <div className="toggle_text">
                                    Rewritable ?
                                </div>
                            </div>
                        )
                    }
                </form>
            </div>
            <button className="button_main_action" onClick={handleUpdateUnitNode}>
                Update
            </button>
        </>
    );
}