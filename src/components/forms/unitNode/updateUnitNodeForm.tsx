import { useResultHandler } from '@rootTypes/useResultHandler';
import { VisibilityLevel, UnitNodeTypeEnum, useUpdateUnitNodeMutation} from '@rootTypes/compositionFunctions'
import { useState } from 'react';
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import '../form.css'


interface UpdateUnitNodeFormProps {
    currentNodeData: any;
    setCurrentNodeData: (unitNode: any | null) => void;
}

export default function UpdateUnitNodeForm({ currentNodeData, setCurrentNodeData }: UpdateUnitNodeFormProps) {
    const { resultData, handleError, handleSuccess } = useResultHandler();
    const [isLoaderActive, setIsLoaderActive] = useState(false)

    const [updateUnitNodeMutation] = useUpdateUnitNodeMutation();

    const handleUpdateUnitNode = () => {
        setIsLoaderActive(true)

        updateUnitNodeMutation({
            variables: {
                uuid: currentNodeData.uuid,
                visibilityLevel: currentNodeData.visibilityLevel,
                isRewritableInput: currentNodeData.type == UnitNodeTypeEnum.Input ? currentNodeData.isRewritableInput : null
            }
        }).then(UpdateUnitData =>{
            if (UpdateUnitData.data){
                handleSuccess("UnitNode success update")
            }
        }).catch(error => {
            handleError(error);
        }).finally(() => {
            setIsLoaderActive(false);
        });
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
                    {
                        currentNodeData.type == UnitNodeTypeEnum.Input ? (
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
                                    Перезаписываемый ?
                                </div>
                            </div>
                        ) : (<></>)
                    }
                </form>
            </div>
            <button className="button_main_action" onClick={handleUpdateUnitNode}>
                Обновить
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}