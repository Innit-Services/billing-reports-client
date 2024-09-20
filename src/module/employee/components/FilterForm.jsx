import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const FilterForm = ({ onClose, onSubmit }) => {
  const [filterData, setFilterData] = useState({
    first_name: '',
    last_name: '',
    employee_id: '',
    department: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filterData); // Submit the filter data
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 w-full max-w-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black">Filter Employees</h2>
            <button onClick={onClose} className="text-black">
              &times;
            </button>
          </div>

          {/* Filter Fields */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className="block text-base font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                value={filterData.first_name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 py-2 px-1 text-base font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="last_name"
                className="block text-base font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={filterData.last_name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 py-2 px-1 text-base font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="employee_id"
                className="block text-base font-medium text-gray-700"
              >
                Employee ID
              </label>
              <input
                type="text"
                name="employee_id"
                id="employee_id"
                value={filterData.employee_id}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 py-2 px-1 text-base font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="department"
                className="block text-base font-medium text-gray-700"
              >
                Department
              </label>
              <input
                type="text"
                name="department"
                id="department"
                value={filterData.department}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 py-2 px-1 text-base font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-base font-medium text-gray-700"
              >
                Status
              </label>
              <select
                name="status"
                id="status"
                value={filterData.status}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 py-2 px-1 text-base font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-md font-medium"
              >
                Apply Filter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FilterForm;
