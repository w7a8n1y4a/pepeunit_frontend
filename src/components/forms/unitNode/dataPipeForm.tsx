import { useAsyncHandler } from '@handlers/useAsyncHandler';
import { useGetDataPipeConfigLazyQuery, useSetDataPipeConfigMutation, useUpdateUnitNodeMutation, useDeleteDataPipeDataMutation, useSetDataPipeDataCsvMutation} from '@rootTypes/compositionFunctions'
import Spinner from '@primitives/spinner'
import createYamlFile from '@src/utils/createYamlFile';
import YAMLEditor from '../../forms/unitNode/ymlEditorForm';
import { useState, useEffect } from 'react';
import '../form.css'

import { useNodeStore } from '@stores/baseStore';
import { useErrorStore } from '@stores/errorStore';


export default function DataPipeForm() {
    const { setHappy, setAngry } = useErrorStore();
    const { isLoaderActive, runAsync } = useAsyncHandler();

    const { currentNodeData, setCurrentNodeData } = useNodeStore();
    const [yamlData, setYamlData] = useState<string | null>(null);

    const [setDataPipeDataCsv] = useSetDataPipeDataCsvMutation();
    const [getDataPipeConfig] = useGetDataPipeConfigLazyQuery();
    const [updateUnitNodeMutation] = useUpdateUnitNodeMutation();
    const [setDataPipeConfigMutation] = useSetDataPipeConfigMutation();
    const [deleteDataPipeDataMutation] = useDeleteDataPipeDataMutation();

    useEffect(() => {
        if (currentNodeData.__typename == "UnitNodeType" && currentNodeData.isDataPipeActive){
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
        }
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
            setAngry('Error exporting YAML')
        }
    };

    const handleDeleteDataPipeData = () => {
        runAsync(async () => {
            let result = await deleteDataPipeDataMutation({
                variables: {
                    uuid: currentNodeData.uuid
                }
            })
            if (result.data?.deleteDataPipeData){
                setHappy("Success Delete Pipe Data")
            }
        })
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

    const handleImportCsv = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        
        runAsync(async () => {
            let result = await setDataPipeDataCsv({
                variables: {
                    uuid: currentNodeData.uuid,
                    file: file,
                }
            })

            if (result.data?.setDataPipeDataCsv){
                setHappy("Success Set DataPipe Data")
            }
        })
        event.target.value = '';
    };

    const handleYamlChange = (ymlText: any) => {
        setYamlData(ymlText);
    };

    const handleExportCSV = async () => {
        runAsync(async () => {
            try {
                const backendUri = (import.meta.env.VITE_BACKEND_URI || window.env.VITE_BACKEND_URI).replace('graphql', '');
                const url = `${backendUri}api/v1/unit_nodes/get_data_pipe_data_csv/${currentNodeData.uuid}?is_bot_auth=false`;
                const token = localStorage.getItem('token');

                if (token) {
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'accept': 'application/json',
                            'x-auth-token': token,
                        },
                        mode: 'cors'
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.detail || 'Failed to export CSV');
                    }

                    const blob = await response.blob();
                    const downloadUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.setAttribute(
                        'download',
                        `${currentNodeData.topicName || 'data_pipe'}.zip`
                    );
                    document.body.appendChild(link);
                    link.click();
                    
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(downloadUrl);
                    
                    setHappy('CSV exported successfully');
                }
            } catch (error) {
                setAngry(error instanceof Error ? error.message : 'Error exporting CSV');
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
                                Import YML Config
                                <input 
                                    type="file" 
                                    accept=".yaml,.yml" 
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }} 
                                />
                            </label>
                            <label className="button_add_alter">
                                Import CSV Data
                                <input 
                                    type="file" 
                                    accept=".csv" 
                                    onChange={handleImportCsv}
                                    style={{ display: 'none' }} 
                                />
                            </label>
                        </div>
                        <div className="buttons_import_export">
                            <button 
                                className="button_add_alter" 
                                onClick={handleExportYaml}
                            >
                                Export YML Config
                            </button>
                            <button 
                                className="button_add_alter" 
                                onClick={handleExportCSV}
                            >
                                Export CSV Data
                            </button>
                        </div>
                        <YAMLEditor 
                            initialValue={yamlData}
                            onChange={handleYamlChange}
                        />
                        <button
                            className="button_del_alter" 
                            onClick={handleDeleteDataPipeData}
                        >
                            Del Saved Pipe Data
                        </button>
                    </div>
                )
            }

            <button className="button_main_action" onClick={handleSetDataPipeConfig}>
                Set Config
            </button>
        </>
    );
}