import BaseModal from '../../modal/baseModal';
import { useGetOutputUnitNodesLazyQuery, useDeleteUnitNodeEdgeMutation } from '@rootTypes/compositionFunctions';
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
    const [getOutputUnitNodesQuery] = useGetOutputUnitNodesLazyQuery();
    const [ deleteUnitNodeEdgeMutation ] = useDeleteUnitNodeEdgeMutation();
    const [collapsedUnits, setCollapsedUnits] = useState<{ [key: string]: boolean }>({});

    const [isLoaderActive, setIsLoaderActive] = useState(false)
    const [resultData, setResultData] = useState<{ type: ResultType; message: string | null }>({
        type: ResultType.Happy,
        message: null
    });

    useEffect(() => {
        getOutputUnitNodesQuery({
            variables: {
                unitNodeInputUuid: currentNodeData.uuid,
                limit: 10,
                offset: 0
            }
        }).then(resultOutputNodes => {
            if (resultOutputNodes.data?.getOutputUnitNodes) {
                console.log(resultOutputNodes.data.getOutputUnitNodes);
                setNodeOutputs(resultOutputNodes.data.getOutputUnitNodes);
            }
        });
    }, [getOutputUnitNodesQuery, currentNodeData.uuid]);

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
            {
                isLoaderActive && (<Spinner/>)
            }
            <div className="unit-list">
                {nodeOutputs ? (
                    nodeOutputs.map((unitOutput: any) => {
                        const { unit, unitOutputNodes } = unitOutput;

                        return (
                            <div key={unit.uuid} className="unit-item">
                                <button
                                    className="unit-header"
                                    onClick={() => handleUnitToggle(unit.uuid)}
                                >
                                    <h3>{`${unit.name} ${unit.visibilityLevel}`}</h3>
                                </button>

                                {collapsedUnits[unit.uuid] && (
                                    <div className="unit-nodes">
                                        {unitOutputNodes && unitOutputNodes.map((node: any) => (
                                            <>
                                                <h4 key={node.uuid}>{node.topicName || 'Unnamed Topic'}</h4>
                                                <button key={node.uuid} className="unit-node" onClick={() => handleDeleteRepo(node.uuid)}>
                                                    delete
                                                </button>
                                            </>
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
