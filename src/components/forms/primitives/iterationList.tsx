import { useState } from 'react';
import useModalHandlers from '@handlers/useModalHandlers';

import './primitives.css'

interface IterationProps<T> {
    items: T[] | null;
    renderType: 'button' | 'collapse';
    handleDelete?: (uuid: string) => void;
    handleCreate?: (uuid: string) => void;
    openModalName?: string | null;
}

const IterationList = <T extends { uuid: string }>({
    items,
    renderType,
    openModalName,
    handleDelete,
    handleCreate,
}: IterationProps<T>) => {

    const { openModal } = useModalHandlers();
    const [collapsedUnits, setCollapsedUnits] = useState<{ [key: string]: boolean }>({});
    
    const handleToggle = (unitId: string) => {
        setCollapsedUnits(prev => ({
            ...prev,
            [unitId]: !prev[unitId]
        }));
    };

    const renderUnitItem = (unit: any) => (
        <>
            <button className="iteration-header" onClick={() => handleToggle(unit.uuid)}>
                <h3>{unit.name} {unit.visibilityLevel}</h3>
            </button>
            {collapsedUnits[unit.uuid] && unit.outputUnitNodes && (
                <div className="iteration-nodes">
                    {unit.outputUnitNodes.map((node: any) => (
                        <div className="iteration-node" key={node.uuid}>
                            <h4>{node.topicName}</h4>
                            {handleDelete && (
                                <button
                                    className="iteration-node-del-button"
                                    onClick={() => handleDelete(node.uuid)}
                                >
                                    delete
                                </button>
                            )}
                            {handleCreate && (
                                <button
                                    className="iteration-node-add-button"
                                    onClick={() => handleCreate(node.uuid)}
                                >
                                    add
                                </button>
                            )}
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
                {handleDelete ? (
                    <button
                        className="iteration-node-del-button"
                        onClick={() => handleDelete(permission.uuid)}
                    >
                        delete
                    </button>
                ) : ( <></>)}
                {handleCreate ? (
                    <button
                        className="iteration-node-add-button"
                        onClick={() => handleCreate(permission.uuid)}
                    >
                        add
                    </button>
                ) : ( <></>)}
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
                    <h3>Нет данных</h3>
                )
            }
            {
                openModalName ? (
                    <div className="iteration-item" onClick={() => openModal(openModalName)}>
                        <h3>Добавить ресурс</h3>
                    </div>
                ) : (<></>)
            }
        </>
    );
};

export default IterationList;
