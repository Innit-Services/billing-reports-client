import React from 'react';

const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
    return (
        <div className="flex justify-between  absolute bottom-0 left-0 right-0 p-4 bg-white">
            <button
                className="px-4 border border-gray-300 hover:bg-gray-100 disabled:opacity-50 h-[2.3rem]"
                onClick={onPrevPage}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="px-4 text-gray-700">
                Page {currentPage} of {totalPages}
            </span>
            <button
                className="px-4 border border-gray-300  hover:bg-gray-100 disabled:opacity-50 h-[2.3rem]"
                onClick={onNextPage}
                disabled={currentPage >= totalPages}
            >
                Next
            </button>
        </div>

    );
};

export default Pagination;