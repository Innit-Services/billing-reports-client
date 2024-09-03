import React from 'react';

const Search = ({ searchQuery, onSearchChange }) => {
    return (
        <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={onSearchChange}
            className="border border-gray-200 rounded-lg py-2 px-3 max-w-xs w-full mx-3"
        />
    );
};

export default Search;