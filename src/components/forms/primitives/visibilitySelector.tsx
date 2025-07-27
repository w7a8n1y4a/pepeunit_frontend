import React from 'react';
import {stringToFormat} from '@utils/stringToFormat'

import './primitives.css';


export enum VisibilityLevel {
    Internal = "INTERNAL",
    Private = "PRIVATE",
    Public = "PUBLIC",
}

type VisibilitySelectorProps = {
    levels: VisibilityLevel[];
    selectedVisibilityLevels: VisibilityLevel[];
    setSelectedVisibilityLevels: (levels: VisibilityLevel[]) => void;
};

const VisibilitySelector: React.FC<VisibilitySelectorProps> = ({
    levels,
    selectedVisibilityLevels,
    setSelectedVisibilityLevels,
}) => {
    const toggleVisibilityLevel = (level: VisibilityLevel) => {
        if (selectedVisibilityLevels.includes(level)) {
            setSelectedVisibilityLevels(
                selectedVisibilityLevels.filter((selectedLevel) => selectedLevel !== level)
            );
        } else {
            setSelectedVisibilityLevels([...selectedVisibilityLevels, level]);
        }
    };

    return (
        <div className="entity-type-selector">
            {Object.values(levels).map((level) => (
                <button
                    key={level}
                    className={`entity-button ${selectedVisibilityLevels.includes(level) ? 'active' : ''}`}
                    onClick={() => toggleVisibilityLevel(level)}
                >
                    {stringToFormat(level)}
                </button>
            ))}
        </div>
    );
};

export default VisibilitySelector;
