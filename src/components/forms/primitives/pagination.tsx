import React from 'react';

import './primitives.css'

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    inversed?: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    inversed
}) => {
    return (
        <div className="pagination-controls">
            <button onClick={ inversed ? goToNextPage : goToPreviousPage } disabled={inversed ? currentPage >= totalPages - 1 : currentPage === 0}>
                Previous
            </button>
            <span>Page {inversed ? totalPages - currentPage : currentPage + 1} of {totalPages}</span>
            <button onClick={ inversed ? goToPreviousPage : goToNextPage } disabled={inversed ? currentPage === 0 : currentPage >= totalPages - 1}>
                Next
            </button>
        </div>
    );
};

export default PaginationControls;
