import React from 'react';
import Search from "../../../shared/components/Search";
import Filter from "../../../shared/components/Filter";
import AddButton from './AddButton';

const EmployeeHeader = ({ searchQuery, onSearchChange, onAddClick }) => {
    return (
        <div className="flex justify-between border rounded-t-lg text-white items-center">
            <h2 className="flex-grow p-3 fs-5 text-black font-semibold">Employees</h2>
            <div className="flex mt-2">
                <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />
                <AddButton onClick={onAddClick} />
                <Filter onFilterClick={() => { }} />
            </div>
        </div>
    );
};

export default EmployeeHeader;
