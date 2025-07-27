import React from 'react';
import {stringToFormat} from '@utils/stringToFormat'

export enum LogLevel {
    Debug = 'DEBUG',
    Info = 'INFO',
    Warning = 'WARNING',
    Error = 'ERROR',
    Critical = 'CRITICAL',
}

import './primitives.css';

type LogLevelSelectorProps = {
    levels:  LogLevel[];
    selectedLogLevels:  LogLevel[];
    setSelectedLogLevels: (levels:  LogLevel[]) => void;
};

const LogLevelSelector: React.FC<LogLevelSelectorProps> = ({
    levels,
    selectedLogLevels,
    setSelectedLogLevels,
}) => {
    const toggleLogLevel = (level:  LogLevel) => {
        if (selectedLogLevels.includes(level)) {
            setSelectedLogLevels(
                selectedLogLevels.filter((selectedLevel) => selectedLevel !== level)
            );
        } else {
            setSelectedLogLevels([...selectedLogLevels, level]);
        }
    };

    return (
        <div className="entity-type-selector">
            {Object.values(levels).map((level) => (
                <button
                    key={level}
                    className={`entity-button ${selectedLogLevels.includes(level) ? 'active' : ''}`}
                    onClick={() => toggleLogLevel(level)}
                >
                    {stringToFormat(level)}
                </button>
            ))}
        </div>
    );
};

export default LogLevelSelector;
