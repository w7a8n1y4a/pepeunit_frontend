import { useState } from 'react';
import { NodeType } from '@rootTypes/nodeTypeEnum';
import nodeTypeToUserNavigation from '@src/utils/nodeTypeToUserNavigation';
import useModalHandlers from '@handlers/useModalHandlers';
import { stringToFormat } from '@utils/stringToFormat';
import { registryToText } from '@utils/registryToText';

import './primitives.css';

interface IterationProps<T> {
    items: T[] | null;
    renderType: string;
    selectedEntityType: NodeType;
    handleDelete?: (uuid: string) => void;
    handleCreate?: (uuid: string) => void;
    openModalName?: string | null;
    onFocusNode?: (uuid: string, nodeType: string) => void;
}

const IterationList = <T extends { uuid: string, __typename: string }>({
    items,
    renderType,
    selectedEntityType,
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
        <div className="iteration-actions">
            {handleDelete && (
                <button className="iteration-node-del-button" onClick={() => handleDelete(uuid)}>
                    Delete
                </button>
            )}
            {handleCreate && (
                <button className="iteration-node-add-button" onClick={() => handleCreate(uuid)}>
                    Add
                </button>
            )}
            {onFocusNode && nodeType && (
                <button className="iteration-node-add-button" onClick={() => onFocusNode(uuid, nodeTypeToUserNavigation(nodeType))}>
                    Pick
                </button>
            )}
        </div>
    );

    const getHeaders = () => {
        switch (selectedEntityType) {
            case NodeType.Registry:
                return ['Platform', 'Repository URL', 'Actions'];
            case NodeType.Repo:
            case NodeType.Unit:
                return ['Name', 'Visibility', 'Actions'];
            case NodeType.User:
                return ['Login', 'Role', 'Status', 'Actions'];
            default:
                return [];
        }
    };

    const getRowData = (item: any) => {
        switch (selectedEntityType) {
            case NodeType.Registry:
                return [
                    stringToFormat(item.platform),
                    item.repositoryUrl ? registryToText(item.repositoryUrl) : '-'
                ];
            case NodeType.Repo:
            case NodeType.Unit:
                return [item.name, stringToFormat(item.visibilityLevel)];
            case NodeType.User:
                return [item.login, stringToFormat(item.role), stringToFormat(item.status)];
            default:
                return [];
        }
    };

    const renderTable = () => (
        <table className="iteration-table">
            <thead>
                <tr>
                    {getHeaders().map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {items?.map((item) => (
                    <tr key={item.uuid}>
                        {getRowData(item).map((data, index) => (
                            <td key={index}>{data || '-'}</td>
                        ))}
                        <td>
                            {renderActionButtons(item.uuid, item.__typename)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderCustomUnitItem = (units: Array<any>) => (
            units && units.length > 0 && (
                units.map((unit) => (
                    <div className="iteration-unit">
                        <button className="iteration-unit-header" onClick={() => handleToggle(unit.uuid)}>
                            <h3>{unit.name} {stringToFormat(unit.visibilityLevel)}</h3>
                        </button>
                        {collapsedUnits[unit.uuid] && unit.unitNodes && (
                            <table className="iteration-table">
                                <thead>
                                    <tr>
                                        <th>Topic Name</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unit.unitNodes.map((node: any) => (
                                        <tr key={node.uuid}>
                                            <td>{node.topicName}</td>
                                            <td>{renderActionButtons(node.uuid)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )
            )

    ));

    return (
        <div className="iteration-container">
            {items && items.length > 0 ? (
                renderType === 'button' ? renderTable() : renderCustomUnitItem(items)
            ) : (
                <div className="iteration-empty">No items found</div>
            )}

            {openModalName && (
                <button className="iteration-add-button" onClick={() => openModal(openModalName)}>
                    Pick Agent
                </button>
            )}

            {selectedEntityType === NodeType.Registry && (
                <button className="iteration-add-button" onClick={() => openModal('createRepositoryRegistry')}>
                    Create Registry
                </button>
            )}
        </div>
    );
};

export default IterationList;