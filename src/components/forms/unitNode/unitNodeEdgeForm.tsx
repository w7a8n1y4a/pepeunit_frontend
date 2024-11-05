import BaseModal from '../../modal/baseModal';
import { useGetUnitsOutputByInputLazyQuery, useDeleteUnitNodeEdgeMutation } from '@rootTypes/compositionFunctions';
import { useState, useEffect } from 'react';
import useModalHandlers from '@handlers/useModalHandlers';
import { useModalStore } from '@stores/baseStore';
import { ResultType } from '@rootTypes/resultEnum'
import Spinner from '@primitives/spinner'
import ResultQuery from '@primitives/resultQuery'
import UnitNodeEdgeCreateForm from '../../forms/unitNode/unitNodeEdgeCreateForm';
import '../form.css';

interface UnitNodeEdgeFormProps {
    currentNodeData: any;
}

export default function UnitNodeEdgeForm({ currentNodeData }: UnitNodeEdgeFormProps) {

    const { openModal } = useModalHandlers();
    const { activeModal } = useModalStore();
    const [nodeOutputs, setNodeOutputs] = useState<Array<any> | null>(null);
    const [getUnitsOutputByInputQuery] = useGetUnitsOutputByInputLazyQuery();
    const [ deleteUnitNodeEdgeMutation ] = useDeleteUnitNodeEdgeMutation();
    const [collapsedUnits, setCollapsedUnits] = useState<{ [key: string]: boolean }>({});

    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });

    useEffect(() => {
        getUnitsOutputByInputQuery({
            variables: {
                unitNodeInputUuid: currentNodeData.uuid,
                limit: 7,
                offset: 0
            }
        }).then(resultOutputNodes => {
            if (resultOutputNodes.data?.getUnits) {
                console.log('Full nodeOutputs:', resultOutputNodes.data.getUnits.units);
                setNodeOutputs(resultOutputNodes.data.getUnits.units);
            }
        });
    }, [currentNodeData]);

    const handleUnitToggle = (unitId: string) => {
        setCollapsedUnits(prev => ({
            ...prev,
            [unitId]: !prev[unitId]
        }));
    };

    const handleDeleteRepo = (outputNodeUuid: string) => {
        setIsLoaderActive(true)
        setResultData({
          ...resultData,
          message: null
        })
    
        if (currentNodeData){
          deleteUnitNodeEdgeMutation(
            {
              variables: {
                inputUuid: currentNodeData.uuid,
                outputUuid: outputNodeUuid
              }
            }
          ).then(result => {
            if (result.data){
              setIsLoaderActive(false)
            }
          }).catch(error => {
            setIsLoaderActive(false)
            setResultData({ type: ResultType.Angry, message: error.graphQLErrors[0].message.slice(4)})
          })
        }
      };
    

      return (
        <>  
            {isLoaderActive && (<Spinner/>)}
            <div className="unit-list">
                {nodeOutputs ? (
                    nodeOutputs.map((unitOutput: any) => {
                        // Use the unitOutput directly since it has the properties you need
                        const { uuid, visibilityLevel, name, outputUnitNodes } = unitOutput;
                        console.log('unitOutput:', unitOutput); // Log the entire unitOutput for debugging
    
                        // You can return null if there's no name or uuid, depending on your logic
                        if (!uuid || !name) return null;
    
                        return (
                            <div key={uuid} className="unit-item">
                                <button
                                    className="unit-header"
                                    onClick={() => handleUnitToggle(uuid)}
                                >
                                    <h3>{name} {visibilityLevel}</h3>
                                </button>
    
                                {collapsedUnits[uuid] && (
                                    <div className="unit-nodes">
                                        {outputUnitNodes && outputUnitNodes.map((node: any) => (
                                            <div key={node.uuid}>
                                                <h4>{node.topicName || 'Unnamed Topic'}</h4>
                                                <button className="unit-node" onClick={() => handleDeleteRepo(node.uuid)}>
                                                    delete
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p>No output nodes available.</p>
                )}
            </div>
    
            <BaseModal
                modalName={'Поиск по Unit'}
                open={activeModal === 'unitNodeEdgeCreate'}
                openModalType={"unitNodeAddOutputToInput"} 
            >
                {currentNodeData && (
                    <UnitNodeEdgeCreateForm
                        currentNodeData={currentNodeData}
                    />
                )}
            </BaseModal>
    
            <button className="button_open_alter" onClick={() => openModal('unitNodeEdgeCreate')}>
                Добавить
            </button>
    
            <ResultQuery
                resultData={resultData}
            />
        </>
    );
}
