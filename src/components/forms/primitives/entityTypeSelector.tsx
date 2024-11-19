import React from 'react';

import {
    PermissionEntities,
 } from '@rootTypes/compositionFunctions';

import './primitives.css'

type EntityTypeSelectorProps = {
    entities: typeof PermissionEntities; // или `string[]`, в зависимости от структуры `PermissionEntities`
    selectedEntityType: string;
    setSelectedEntityType: (entityType: PermissionEntities) => void;
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
                    onClick={() => setSelectedEntityType(entityType as PermissionEntities)}
                >
                    {entityType}
                </button>
            ))}
        </div>
    );
};

export default EntityTypeSelector;
