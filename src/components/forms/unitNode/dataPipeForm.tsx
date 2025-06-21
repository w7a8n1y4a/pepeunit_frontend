import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetDataPipeConfigLazyQuery, useSetDataPipeConfigMutation, useUpdateUnitNodeMutation} from '@rootTypes/compositionFunctions'
import Spinner from '@primitives/spinner'
import createYamlFile from '@src/utils/createYamlFile';
import YAMLEditor from '../../forms/unitNode/ymlEditorForm';
import { useState, useEffect } from 'react';
import '../form.css'

import { useNodeStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';


export default function DataPipeForm() {
    const { setHappy } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

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

    const handleExportYaml = async () => {
        try {
            const result = await getDataPipeConfig({
                variables: {
                    uuid: currentNodeData.uuid,
                }
            });
            
            if (result.data?.getDataPipeConfig) {
                const yamlContent = result.data.getDataPipeConfig;
                const fileName = `${currentNodeData.topicName || 'config'}.yml`;
                
                const blob = new Blob([yamlContent], { type: 'text/yaml' });
                
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                
                document.body.appendChild(link);
                link.click();
                
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Error exporting YAML:', error);
        }
    };

    const handleSetDataPipeConfig = () => {
        runAsync(async () => {
            let resultUpdateNode = await updateUnitNodeMutation({
                variables: {
                    uuid: currentNodeData.uuid,
                    isDataPipeActive: currentNodeData.isDataPipeActive
                }
            })
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
                    setHappy("Success Set DataPipe")
                }
            } else if (!resultUpdateNode.data?.updateUnitNode.isDataPipeActive) {
                setHappy("Success Deactivate DataPipe")
            }
        })
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setYamlData(content);
            event.target.value = '';
        };
        reader.readAsText(file);
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
                        <div className="buttons_import_export">
                            <label className="button_add_alter">
                                Import YML
                                <input 
                                    type="file" 
                                    accept=".yaml,.yml" 
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }} 
                                />
                            </label>
                            <button 
                                className="button_add_alter" 
                                onClick={handleExportYaml}
                                disabled={!currentNodeData.isDataPipeActive}
                            >
                                Export YML
                            </button>
                        </div>
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
        </>
    );
}