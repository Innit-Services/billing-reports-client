import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const Filter = ({ onFilterClick }) => {
  return (
    <Tooltip title="Filter">
      <button
        type="button"
        className="flex items-center justify-center text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm h-10 w-10 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={onFilterClick}
      >
        <i className="bx bx-filter-alt text-xl"></i>
      </button>
    </Tooltip>
  );
};

export default Filter;
