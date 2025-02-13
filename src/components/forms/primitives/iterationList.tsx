import { useState } from 'react';
import nodeTypeToUserNavigation from '@src/utils/nodeTypeToUserNavigation'
import useModalHandlers from '@handlers/useModalHandlers';

import './primitives.css'

interface IterationProps<T> {
    items: T[] | null;
    renderType: string;
    handleDelete?: (uuid: string) => void;
    handleCreate?: (uuid: string) => void;
    openModalName?: string | null;
    onFocusNode?: (uuid: string, nodeType: string) => void;
}

const IterationList = <T extends { uuid: string }>({
    items,
    renderType,
    openModalName,
    handleDelete,
    handleCreate,
    onFocusNode
}: IterationProps<T>) => {

    const { openModal } = useModalHandlers();
    const [collapsedUnits, setCollapsedUnits] = useState<{ [key: string]: boolean }>({});
    
    const handleToggle = (unitId: string) => {
        setCollapsedUnits(prev => ({
            ...prev,
            [unitId]: !prev[unitId]
        }));
    };

    const renderActionButtons = (uuid: string, nodeType?: string) => (
        <>
            {handleDelete && (
                <button className="iteration-node-del-button" onClick={() => handleDelete(uuid)}>
                    delete
                </button>
            )}
            {handleCreate && (
                <button className="iteration-node-add-button" onClick={() => handleCreate(uuid)}>
                    add
                </button>
            )}
            {onFocusNode && nodeType && (
                <button className="iteration-node-add-button" onClick={() => onFocusNode(uuid, nodeTypeToUserNavigation(nodeType))}>
                    pickme
                </button>
            )}
        </>
    );

    const renderUnitItem = (unit: any) => (
        <>
            <button className="iteration-header" onClick={() => handleToggle(unit.uuid)}>
                <h3>{unit.name} {unit.visibilityLevel}</h3>
            </button>
            {collapsedUnits[unit.uuid] && unit.unitNodes && (
                <div className="iteration-nodes">
                    {unit.unitNodes.map((node: any) => (
                        <div className="iteration-node" key={node.uuid}>
                            <h4>{node.topicName}</h4>
                            {renderActionButtons(node.uuid)}
                        </div>
                    ))}
                </div>
            )}
        </>
    );

    const renderPermissionItem = (permission: any) => (
        <>
            <button className="iteration-header">
                <h3>{permission.name} {permission.visibilityLevel}</h3>
                { renderActionButtons(permission.uuid, permission.__typename) }
            </button>
        </>
    );

    return (
        <>
            {
                items && items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.uuid} className="iteration-item">
                            {
                                renderType === 'button' ? (renderPermissionItem(item)) : (renderUnitItem(item))
                            }
                        </div>
                    ))
                ) : (
                    <h3>No Agent</h3>
                )
            }
            {
                openModalName && (
                    <div className="iteration-item" onClick={() => openModal(openModalName)}>
                        <h3>Pick Agent</h3>
                    </div>
                )
            }
        </>
    );
};

export default IterationList;
