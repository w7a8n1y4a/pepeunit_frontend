import BaseModal from '../../modal/baseModal';
import { useGetOutputUnitNodesLazyQuery } from '@rootTypes/compositionFunctions';
import { useState, useEffect } from 'react';
import useModalHandlers from '@handlers/useModalHandlers';
import { useModalStore } from '@stores/baseStore';
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
    const [collapsedUnits, setCollapsedUnits] = useState<{ [key: string]: boolean }>({});

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

    return (
        <>  
            <button className="button_open_alter" onClick={() => openModal('unitNodeEdgeCreate')}>
                Добавить
            </button>

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
                                            <h4 key={node.uuid}>{node.topicName || 'Unnamed Topic'}</h4>
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
        </>
    );
}
