import React from 'react';

const Search = ({ searchQuery, onSearchChange }) => {
    return (
        <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={onSearchChange}
        className="border text-black border-gray-300 rounded-lg py-3 px-4 w-[10vw] h-[2.4rem] text-sm"
    />
    
    );
};

export default Search;
