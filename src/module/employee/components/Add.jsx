import React from 'react';

const Add = ({ onAddClick }) => {
    return (
        <button
            className="bg-transparent text-black p-2 rounded-lg hover:bg-blue-100 bg-white border-white ml-4"
            onClick={onAddClick}
        >
            <i className="bx bx-plus text-black text-2xl"></i>
        </button>
    );
};

export default Add;