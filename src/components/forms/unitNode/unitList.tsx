import React from 'react';
import { useState } from 'react';

interface Props {
    nodeOutputs: any[] | null;
    handleDeleteEdge?: (uuid: string) => void;
    handleCreateEdge?: (uuid: string) => void;
    openModal?: (modalType: string) => void;
}

const UnitList: React.FC<Props> = ({
    nodeOutputs,
    handleDeleteEdge,
    handleCreateEdge,
    openModal,
}) => {

    const [collapsedUnits, setCollapsedUnits] = useState<{ [key: string]: boolean }>({});

    const handleUnitToggle = (unitId: string) => {
        setCollapsedUnits(prev => ({
            ...prev,
            [unitId]: !prev[unitId]
        }));
    };
    const renderUnitNodes = (
        unitNodes: any[],
        onDelete?: (uuid: string) => void,
        onAdd?: (uuid: string) => void
    ) => (
        <div className="unit-nodes">
            {unitNodes.map((node) => (
                <div className="unit-node" key={node.uuid}>
                    <h4>{node.topicName || 'Unnamed Topic'} {node.state}</h4>
                    {onAdd ? (
                        <button className="unit-node-add-button" onClick={() => onAdd(node.uuid)}>
                            add
                        </button>
                    ):(<></>)}
                    
                    {onDelete ? (
                        <button className="unit-node-del-button" onClick={() => onDelete(node.uuid)}>
                            delete
                        </button>
                    ):(<></>)}
                </div>
            ))}
        </div>
    );

    const renderUnitList = (units: any[], isEditable: boolean) =>
        units.map((unit) => {
            if (!unit.uuid || !unit.name) return null;
            return (
                <div key={unit.uuid} className="unit-item">
                    <button className="unit-header" onClick={() => handleUnitToggle(unit.uuid)}>
                        <h3>{unit.name} {unit.visibilityLevel}</h3>
                    </button>
                    {collapsedUnits[unit.uuid] && unit.outputUnitNodes && renderUnitNodes(
                        unit.outputUnitNodes,
                        isEditable ? handleDeleteEdge : handleCreateEdge,
                        isEditable ? undefined : handleCreateEdge
                    )}
                </div>
            );
        });

    return (
        <div>
            <div className="unit-list">
                {nodeOutputs && nodeOutputs.length > 0 ? (
                    renderUnitList(nodeOutputs, handleCreateEdge ? true : false)
                ) : (
                    <p>No output nodes available.</p>
                )}
                { openModal ? (

                    <div className="unit-item" onClick={() => openModal('unitNodeEdgeCreate')}>
                        <h3>Добавить новый Output</h3>
                    </div>
                ) : (<></>)}
            </div>
        </div>
    );
};

export default UnitList;
