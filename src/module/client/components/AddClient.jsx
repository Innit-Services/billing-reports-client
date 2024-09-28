import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "tailwindcss/tailwind.css";
import ClientService from "../service/ClientService";

import { useState } from "react";
const AddClient = ({ onClose }) => {
  const [client, setClient] = useState({
    client_name: "",
    contact_person: "",
    contact_number: "",
    email: "",
    address: "",
    contract_start_date: "",
    contract_end_date: "",
    country: "",
    contract: { startDate: "", endDate: "", termDate: "", status: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ClientService.saveClient(client)
      .then((res) => {
        setMsg("Client Added Successfully");
        setClient({
          client_name: "",
          contact_person: "",
          contact_number: "",
          email: "",
          address: "",
          country: "",
          contract: { startDate: "", endDate: "", termDate: "", status: "" },
        });
      })
      .catch((error) => {
        setMsg("Error in adding client");
      });
  };

  const handleContractChange = (e) => {
    setClient({
      ...client,
      contract: {
        ...client.contract,
        [e.target.name]: e.target.value,
      },
    });
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 bg-gray-200 bg-opacity-50 z-40"></div>

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-col h-[95vh] w-[35vw]">
          <div className="flex p-2  justify-between items-center border-b-2">
            <h2 className="text-xl font-semibold text-black">Add Client</h2>
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              onClick={onClose}
              className="cursor-pointer text-black"
            />
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto  p-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="client_name"
                  className="mb-1 block text-base font-medium text-gray-700"
                >
                  Client Name
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="client_name"
                  id="client_name"
                  value={client.client_name}
                  onChange={handleChange}
                  placeholder="enter client"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="contact_person"
                  className="mb-1 block text-base font-medium text-gray-700"
                >
                  Contact Person
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="contact_person"
                  id="contact_person"
                  placeholder="enter name "
                  value={client.contact_person}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="contact_number"
                  className="mb-1 block text-base font-medium text-gray-700"
                >
                  Contact Number
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="contact_number"
                  id="contact_number"
                  placeholder="enter contact"
                  value={client.contact_number}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700  outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="mb-1 block text-base font-medium text-gray-700"
                >
                  Email
                </label>
              </div>

              <div className="mb-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={client.email}
                  onChange={handleChange}
                  placeholder="enter email"
                  className="w-full rounded-md border border-gray-300 bg-white text-black py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="address"
                  className="mb-1 block text-base font-medium text-gray-700"
                >
                  Address
                </label>
              </div>

              <div className="mb-2">
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={client.address}
                  onChange={handleChange}
                  placeholder="enter address"
                  className="w-full rounded-md border text-black border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="address"
                  className="mb-1 block text-base font-medium text-gray-700"
                >
                  Country
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={client.country}
                  onChange={handleChange}
                  placeholder="enter country"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="startDate"
                  className="mb-1 block text-base font-medium text-gray-700"
                >
                  Start Date
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={client.contract.start_date}
                  onChange={handleContractChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="endDate"
                  className="mb-1 block text-base font-medium text-gray-700"
                >
                  End Date
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={client.contract.end_date}
                  onChange={handleContractChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="termDate"
                  className="mb-1 block text-base font-medium text-gray-700"
                >
                  Term Date
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="date"
                  name="termDate"
                  id="termDate"
                  value={client.contract.term_date}
                  onChange={handleContractChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="Status"
                  className="block text-base font-medium text-gray-700"
                >
                  Status
                </label>
              </div>
              <div className="mb-2">
                <select
                  id="status"
                  name="status"
                  value={client.contract.status}
                  onChange={handleContractChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </form>
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
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClient;
