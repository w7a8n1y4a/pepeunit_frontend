import React from 'react';
import {stringToFormat} from '@utils/stringToFormat'

import './primitives.css';


export enum PrivateRegistry {
    Private = 'PRIVATE',
    Public = 'PUBLIC',
}

type PrivateRegistrySelectorProps = {
    levels:  PrivateRegistry[];
    selectedPrivateRegistry:  PrivateRegistry[];
    setSelectedPrivateRegistry: (levels:  PrivateRegistry[]) => void;
};

const PrivateRegistrySelector: React.FC<PrivateRegistrySelectorProps> = ({
    levels,
    selectedPrivateRegistry,
    setSelectedPrivateRegistry,
}) => {
    const togglePrivateRegistry = (level:  PrivateRegistry) => {
        if (selectedPrivateRegistry.includes(level)) {
            setSelectedPrivateRegistry(
                selectedPrivateRegistry.filter((selectedLevel) => selectedLevel !== level)
            );
        } else {
            setSelectedPrivateRegistry([...selectedPrivateRegistry, level]);
        }
    };

    return (
        <div className="entity-type-selector">
            {Object.values(levels).map((level) => (
                <button
                    key={level}
                    className={`entity-button ${selectedPrivateRegistry.includes(level) ? 'active' : ''}`}
                    onClick={() => togglePrivateRegistry(level)}
                >
                    {stringToFormat(level)}
                </button>
            ))}
        </div>
    );
};

export default PrivateRegistrySelector;
