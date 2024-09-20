import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns"; // For formatting dates
import EmployeeService from "../EmployeeService";
import Notification from "../../../shared/components/Notification";

const EditEmployeeStatus = ({ employeestatus, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    client_name: "",
    person_id: "",
    status: "",
    effective_date: "",
    end_date: "",
    updated_by: "",
    updated_on: "",
    home_non_home_client: "",
  });

  useEffect(() => {
    if (employeestatus) {
      setFormData({
        ...employeestatus,
        effective_date: employeestatus.effective_date
          ? format(new Date(employeestatus.effective_date), "yyyy-MM-dd")
          : "",
        end_date: employeestatus.end_date
          ? format(new Date(employeestatus.end_date), "yyyy-MM-dd")
          : "",
        updated_on: employeestatus.updated_on
          ? format(new Date(employeestatus.updated_on), "yyyy-MM-dd HH:mm:ss")
          : "",
      });
    }
  }, [employeestatus]); // Add employeestatus as a dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    EmployeeService.updateEmployeeStatus(formData)
      .then((response) => {
        console.log("Employee Status updated:", response.data);
        if (onUpdateSuccess) {
          onUpdateSuccess(response.data);
        }

        onClose();
        toast.success("Employee Status updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating Employee Status:", error);
        toast.error("Error updating Employee Status.");
        onClose();
      });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <Notification />
        <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-col h-[95vh] w-full max-w-lg">
          <div className="flex p-2 justify-between items-center border-b-2 text-black">
            <h2 className="text-xl font-semibold">Update Employee Status</h2>
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              onClick={onClose}
              className="cursor-pointer"
            />
          </div>
          <div className="flex-grow overflow-y-auto p-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="client_name"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Client Name
                </label>
                <input
                  type="text"
                  name="client_name"
                  id="client_name"
                  value={formData.client_name}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="person_id"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Person ID
                </label>
                <input
                  type="number"
                  name="person_id"
                  id="person_id"
                  value={formData.person_id}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="status"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="effective_date"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Effective Date
                </label>
                <input
                  type="date"
                  name="effective_date"
                  id="effective_date"
                  value={formData.effective_date}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="end_date"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="updated_by"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Updated By
                </label>
                <input
                  type="text"
                  name="updated_by"
                  id="updated_by"
                  value={formData.updated_by}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="updated_on"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Updated On
                </label>
                <input
                  type="date"
                  name="updated_on"
                  id="updated_on"
                  value={formData.updated_on}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="home_non_home_client"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Home/Non-Home Client
                </label>
                <input
                  type="text"
                  name="home_non_home_client"
                  id="home_non_home_client"
                  value={formData.home_non_home_client}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end items-center p-2 border-t-2">
                <button
                  type="button"
                  className="text-white px-3 py-1 rounded bg-danger mr-4 ml-4 "
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white px-3 py-1 mr-3 rounded bg-primary "
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

export default EditEmployeeStatus;