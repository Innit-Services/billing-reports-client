import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage, onPageChange }) => {
    const [pageInput, setPageInput] = useState('');

    const handlePageInputChange = (e) => {
        setPageInput(e.target.value);
    };

    const handlePageSearch = () => {
        const pageNumber = parseInt(pageInput, 10);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
        setPageInput('');
    };

    return (
        <div className="flex justify-between items-center absolute bottom-0 left-0 right-0 p-4 bg-white">
            <button
                className="px-4 border border-gray-300 hover:bg-gray-100 disabled:opacity-50 h-[2.3rem]"
                onClick={onPrevPage}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <div className="ml-4">
                <span className="px-4 text-gray-700" style={{ marginRight: "30vw" }}>
                    Page
                    <Tooltip title="Search page" arrow>
                        <input
                            type="text"
                            placeholder={currentPage}
                            className="border border-gray-300 px-2 py-1 w-[40px] mx-1 text-center"
                            value={pageInput}
                            onChange={handlePageInputChange}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handlePageSearch();
                                }
                            }}
                        />
                    </Tooltip>
                    of {totalPages}
                </span>
                <button
                    className="px-4 border border-gray-300 hover:bg-gray-100 disabled:opacity-50 h-[2.3rem]"
                    onClick={onNextPage}
                    disabled={currentPage >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
