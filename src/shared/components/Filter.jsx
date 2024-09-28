import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const Filter = ({ onFilterClick }) => {
    return (
<Tooltip title="Filter">
  <button
    type="button"
    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-[3vw]"
  >
    <i className="bx bx-filter-alt fs-5 text-md"></i>
  </button>
</Tooltip>

    );
};

export default Filter;
