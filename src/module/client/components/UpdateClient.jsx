import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ClientService from "../service/ClientService";

const UpdateClient = ({ client, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    client_id: "",
    client_name: "",
    contact_person: "",
    contact_number: "",
    email: "",
    address: "",
    country: "",
    contract: { startDate: "", endDate: "", termDate: "", status: "" },
  });

  useEffect(() => {
    if (client) {
      console.log(client);
      setFormData(client);
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    ClientService.updateClient(formData)
      .then((response) => {
        console.log("Department updated:", response.data);
        if (onUpdateSuccess) {
          onUpdateSuccess(response.data);
        }
        onClose();
      })
      .catch((error) => {
        console.error("Error updating department:", error);
      });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-col h-[95vh] w-full max-w-lg">
          <div className="flex p-2 justify-between items-center border-b-2 text-black">
            <h2 className="text-xl font-semibold">Update Client</h2>
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
                  htmlFor="departmentName"
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
                  htmlFor="departmentName"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contact_person"
                  id="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="departmentName"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact_number"
                  id="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="departmentName"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="departmentName"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="departmentName"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="departmentName"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <input
                  type="text"
                  name="startDate"
                  id="startDate"
                  value={formData.contract.startDate}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="departmentName"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <input
                  type="text"
                  name="endDate"
                  id="endDate"
                  value={formData.contract.endDate}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="departmentName"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Term Date
                </label>
                <input
                  type="text"
                  name="termDate"
                  id="termDate"
                  value={formData.contract.termDate}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="departmentName"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={formData.contract.status}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </form>
          </div>

          <div className="flex justify-end p-2 border-t-2">
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
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateClient;
