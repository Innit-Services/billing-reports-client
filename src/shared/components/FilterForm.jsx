import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const FilterForm = ({ onClose, onFilter }) => {
    const [formData, setFormData] = useState({
        departmentName: '',
        description: '',
        createdAt: new Date().toISOString().slice(0, 19),
        updatedAt: new Date().toISOString().slice(0, 19),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFilter = (e) => {
        e.preventDefault();
        onFilter(formData);
        onClose(); // Close the form after applying filter
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40" onClick={onClose}></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-col w-full max-w-lg h-[95vh]">
                    <div className="flex p-2 justify-between items-center border-b-2 text-black">
                        <h2 className="text-xl font-semibold">Filter Departments</h2>
                        <FontAwesomeIcon
                            icon={faTimes}
                            size="lg"
                            onClick={onClose}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="flex-grow overflow-y-auto p-3">
                        <form onSubmit={handleFilter}>
                            <div className="mb-2">
                                <label htmlFor="departmentName" className="mb-1 block text-base font-medium text-gray-700">
                                    Department Name
                                </label>
                                <input
                                    type="text"
                                    name="departmentName"
                                    id="departmentName"
                                    value={formData.departmentName}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Enter department name"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="description" className="mb-1 block text-base font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Enter description"
                                />
                            </div>

                            <div className="mb-2">
                                <label htmlFor="createdAt" className="mb-1 block text-base font-medium text-gray-700">
                                    Created At
                                </label>
                                <input
                                    type="datetime-local"
                                    name="createdAt"
                                    id="createdAt"
                                    value={formData.createdAt}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>

                          
                        </form>
                    </div>
                    <div className="flex justify-end items-center p-2 border-t-2">
                        <button
                            type="button"
                            className="text-white px-3 py-1 rounded bg-red-500 mr-4"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="text-white px-3 py-1 rounded bg-blue-500"
                            onClick={handleFilter}
                        >
                            Apply Filter
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterForm;