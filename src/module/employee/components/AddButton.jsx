import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const AddButton = ({ onClick }) => {
    return (
        <Tooltip title="Add Employee">
            <button
                type="button"
                className="flex items-center justify-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition duration-200 ease-in-out h-10 w-10 mx-2"
                onClick={onClick}
            >
                <i className="bx bx-plus text-xl"></i>
            </button>
        </Tooltip>
    );
};

export default AddButton;
