import React from 'react';

const Add = ({ onAddClick }) => {
    return (
        <button
            className="bg-transparent text-black p-2 rounded-lg shadow hover:bg-blue-100 bg-white border-white "
            onClick={onAddClick}
        >
            <i className="bx bx-plus text-2xl fs-5"></i>
        </button>
    );
};

export default Add;
