import React from 'react';

const Filter = ({ onFilterClick }) => {
    return (
        <button
            style={{ marginLeft: '50vw' }}
            className="bg-transparent text-black p-2 rounded-lg hover:bg-blue-100 bg-white border-white ml-4"
            onClick={onFilterClick}
        >
             <i className="bx bx-filter-alt text-black text-xl"></i>
        </button>
    );
};

export default Filter;