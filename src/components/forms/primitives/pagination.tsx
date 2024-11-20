import React from 'react';

import './primitives.css'

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage
}) => {
    return (
        <div className="pagination-controls">
            <button onClick={goToPreviousPage} disabled={currentPage === 0}>
                Previous
            </button>
            <span>Page {currentPage + 1} of {totalPages}</span>
            <button onClick={goToNextPage} disabled={currentPage >= totalPages - 1}>
                Next
            </button>
        </div>
    );
};

export default PaginationControls;
