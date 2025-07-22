import React from 'react';

import { NodeType } from '@rootTypes/nodeTypeEnum'

import './primitives.css'

type EntityTypeSelectorProps = {
    entities: NodeType[];
    selectedEntityType: string;
    setSelectedEntityType: (entityType: NodeType) => void;
};

const EntityTypeSelector: React.FC<EntityTypeSelectorProps> = ({
    entities,
    selectedEntityType,
    setSelectedEntityType,
}) => {
    return (
        <div className="entity-type-selector">
            {Object.values(entities).map((entityType) => (
                <button
                    key={entityType}
                    className={`entity-button ${selectedEntityType === entityType ? 'active' : ''}`}
                    onClick={() => setSelectedEntityType(entityType as NodeType)}
                >
                    {entityType}
                </button>
            ))}
        </div>
    );
};

export default EntityTypeSelector;
