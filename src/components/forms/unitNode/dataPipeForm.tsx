import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { VisibilityLevel, UnitNodeTypeEnum, useUpdateUnitNodeMutation} from '@rootTypes/compositionFunctions'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import YAMLEditor from '../../forms/unitNode/ymlEditorForm';
import { useState } from 'react';
import '../form.css'

import { useNodeStore } from '@stores/baseStore';


export default function DataPipeForm() {
    const { resultData, handleError, handleSuccess } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

    const { currentNodeData, setCurrentNodeData } = useNodeStore();

    const [updateUnitNodeMutation] = useUpdateUnitNodeMutation();

    const handleSetDataPipeConfig = () => {
        runAsync(async () => {
            let result = await updateUnitNodeMutation({
                variables: {
                    uuid: currentNodeData.uuid,
                    visibilityLevel: currentNodeData.visibilityLevel,
                    isRewritableInput: currentNodeData.type == UnitNodeTypeEnum.Input ? currentNodeData.isRewritableInput : null
                }
            })
            if (result.data){
                handleSuccess("UnitNode success update")
            }
        })
    };


    const [yamlData, setYamlData] = useState(null);
    const [yamlError, setYamlError] = useState(null);

    const initialYaml = `# Пример YAML-документа
    person:
    name: John Doe
    age: 30
    address:
        street: 123 Main St
        city: Anytown
        zip: 12345
    hobbies:
    - reading
    - hiking
    - coding
    `;
  const handleYamlChange = (yamlText: string, parsedData: any, error: any) => {
    if (error) {
        console.log(yamlError)
        console.log(yamlData)
        console.log(yamlText)
      setYamlError(error);
      setYamlData(null);
    } else {
      setYamlError(null);
      setYamlData(parsedData);
      console.log('Valid YAML:', parsedData);
    }
  };

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            <div>
                <form>
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
                                    Available ?
                                </div>
                            </div>
                        )
                    }
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
                </form>
            </div>
             <div style={{ padding: '0px', width: '600px', margin: '0 auto' }}>
                <YAMLEditor 
                    initialValue={initialYaml}
                    onChange={handleYamlChange}
                />
                
            </div>
            <button className="button_main_action" onClick={handleSetDataPipeConfig}>
                Set Config
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}