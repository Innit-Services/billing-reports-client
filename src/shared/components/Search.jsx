import React from 'react';

const Search = ({ searchQuery, onSearchChange }) => {
    return (
        <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={onSearchChange}
        className="border text-black border-gray-300 rounded-lg me-3 py-2 px-4 max-w-xs mx-2 w-[12vw] h-[2.4rem] text-sm"
    />
    
    );
};

export default Search;
