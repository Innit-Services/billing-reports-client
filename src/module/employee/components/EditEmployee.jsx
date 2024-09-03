import React, { useState } from "react";

const EditEmployee = ({ employee, onClose }) => {
  const [formData, setFormData] = useState(employee);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    // For example, call an API to update the employee
    console.log("Employee updated:", formData);
    onClose(); // Close the popup after saving
  };

  return (
    <>
      <div
        className="bg-light border border-gray-200 rounded-lg shadow relative p-2"
        style={{ width: "70%", marginLeft: "15%" }}
      >
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
        {/* Popup container */}
        <div
          className="fixed inset-0 flex items-center z-50"
          style={{ justifyContent: "center" }} // Center the form
        >
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Edit Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block text-gray-700">First Name:</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Contact:</label>
                <input
                  type="text"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Department:</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Status:</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-white px-4 py-2 rounded"
                  style={{ backgroundColor: "gray" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  style={{ backgroundColor: "green" }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmployee;
