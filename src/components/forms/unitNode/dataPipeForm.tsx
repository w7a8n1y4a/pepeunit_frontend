import { useResultHandler } from '@handlers/useResultHandler';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetDataPipeConfigLazyQuery, useSetDataPipeConfigMutation, useUpdateUnitNodeMutation} from '@rootTypes/compositionFunctions'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import createYamlFile from '@src/utils/createYamlFile';
import YAMLEditor from '../../forms/unitNode/ymlEditorForm';
import { useState, useEffect } from 'react';
import '../form.css'

import { useNodeStore } from '@stores/baseStore';


export default function DataPipeForm() {
    const { resultData, handleError, handleSuccess } = useResultHandler();
    const { isLoaderActive, runAsync } = useAsyncHandler(handleError);

    const { currentNodeData, setCurrentNodeData } = useNodeStore();
    const [yamlData, setYamlData] = useState<string | null>(null);

    const [getDataPipeConfig] = useGetDataPipeConfigLazyQuery();
    const [updateUnitNodeMutation] = useUpdateUnitNodeMutation();
    const [setDataPipeConfigMutation] = useSetDataPipeConfigMutation();

    useEffect(() => {
        runAsync(async () => {
            let result = await getDataPipeConfig({
                variables: {
                    uuid: currentNodeData.uuid,
                }
            })
            
            if (result.data) {
                setYamlData(result.data.getDataPipeConfig)
            } else {
                setYamlData('')
            }
        })
    }, [currentNodeData]);

    const handleSetDataPipeConfig = () => {
        runAsync(async () => {
            let resultUpdateNode = await updateUnitNodeMutation({
                variables: {
                    uuid: currentNodeData.uuid,
                    isDataPipeActive: currentNodeData.isDataPipeActive
                }
            })
            console.log(yamlData)
            if (resultUpdateNode.data?.updateUnitNode.isDataPipeActive){

                setCurrentNodeData({
                    ...currentNodeData,
                    isDataPipeActive: resultUpdateNode.data?.updateUnitNode.isDataPipeActive
                })

                let result = await setDataPipeConfigMutation({
                    variables: {
                        uuid: currentNodeData.uuid,
                        file: createYamlFile(yamlData),
                    }
                })
                if (result.data?.setDataPipeConfig){
                    handleSuccess("Success Set DataPipe")
                }
            } else if (!resultUpdateNode.data?.updateUnitNode.isDataPipeActive) {
                handleSuccess("Success Deactivate DataPipe")
            }
        })
    };

    const handleYamlChange = (ymlText: any) => {
        setYamlData(ymlText);
    };

    return (
        <>  
            {
                isLoaderActive && (<Spinner/>)
            }
            <div>
                <form>
                    {
                        <div className='toggle_container'>
                            <label className="toggle">
                                <input 
                                    type="checkbox" 
                                    checked={ currentNodeData.isDataPipeActive }
                                    onChange={(e) => setCurrentNodeData({
                                                ...currentNodeData,
                                                isDataPipeActive: e.target.checked
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
                    }
                </form>
            </div>
            {
                currentNodeData.isDataPipeActive && (
                    <div className="data_pipe_editor">
                        <YAMLEditor 
                            initialValue={yamlData}
                            onChange={handleYamlChange}
                        />
                    </div>
                )
            }

            <button style={{ marginTop: '20px' }} className="button_main_action" onClick={handleSetDataPipeConfig}>
                Set Config
            </button>
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}