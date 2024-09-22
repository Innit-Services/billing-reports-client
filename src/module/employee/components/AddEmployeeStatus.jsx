import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "tailwindcss/tailwind.css";
import EmployeeService from "../EmployeeService";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "@mui/material";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import Notification from "../../../shared/components/Notification";

const AddEmployeeStatus = ({ onClose, onAddSuccess, personId }) => {
  const [employeestatus, setEmployeeStatus] = useState({
    client_name: "",
    status: "",
    effective_date: "",
    end_date: "",
    updated_by: "",
    home_non_home_client: "",
    person_id: personId || "",
  });

  const [maxEffectiveDate, setMaxEffectiveDate] = useState(null); // State to store max effective date
  const today = new Date().toISOString().split("T")[0]; // Get current date for validation

  useEffect(() => {
    setEmployeeStatus((prevState) => ({
      ...prevState,
      person_id: personId,
    }));

    // Fetch previously added employee status to get max effective_date
    const fetchPreviousData = async () => {
      try {
        const response = await EmployeeService.getEmployeeStatusListById(
          personId
        ); // Fetch employee statuses by person ID
        if (response && response.data) {
          const effectiveDates = response.data.map(
            (status) => new Date(status.effective_date)
          );
          if (effectiveDates.length > 0) {
            const maxDate = new Date(Math.max.apply(null, effectiveDates));
            setMaxEffectiveDate(maxDate.toISOString().split("T")[0]); // Store max effective date in state
          }
        }
      } catch (error) {
        toast.error("Failed to fetch previous employee statuses.");
      }
    };

    fetchPreviousData();
  }, [personId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "effective_date" || name === "end_date") {
      // Prevent past dates from being set
      if (new Date(value) < new Date(today)) {
        toast.error("You cannot select a past date.");
        return;
      }

      // Prevent setting an effective date earlier than the max effective date
      if (
        name === "effective_date" &&
        maxEffectiveDate &&
        new Date(value) <= new Date(maxEffectiveDate)
      ) {
        toast.error(
          `The Effective Date should be greater than the last added date: ${maxEffectiveDate}`
        );
        return;
      }
    }

    setEmployeeStatus({
      ...employeestatus,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await EmployeeService.AddNewEmployeeStatus(
        employeestatus
      );

      if (response && response.data) {
        toast.success("Employee status saved successfully!");
        onAddSuccess(response.data);
        onClose();
      } else {
        throw new Error("Failed to save employee status.");
      }
    } catch (error) {
      toast.error("Failed to save employee status.");
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-col h-[95vh] w-[30vw]">
          {/* Header */}
          <div className="flex p-2 justify-between items-center border-b-2 text-black">
            <h2 className="text-xl font-semibold">Add Employee Status</h2>
            <Tooltip title="Close Form" arrow>
              <FontAwesomeIcon
                icon={faTimes}
                size="lg"
                onClick={onClose}
                className="cursor-pointer"
              />
            </Tooltip>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-3">
            <form onSubmit={handleSubmit}>
              {/* Client Name */}
              <div className="mb-4">
                <label
                  htmlFor="client_name"
                  className="mb-1 block text-base font-medium text-gray-700"
                >
                  Client Name
                </label>
                <input
                  type="text"
                  name="client_name"
                  id="client_name"
                  value={employeestatus.client_name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-base text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="mb-1 block text-base font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={employeestatus.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-base text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Effective Date & End Date */}
              <div className="mb-4 flex space-x-4">
                <div className="w-full">
                  <label
                    htmlFor="effective_date"
                    className="block text-base font-medium text-gray-700"
                  >
                    Effective Date
                  </label>
                  <input
                    type="date"
                    name="effective_date"
                    id="effective_date"
                    value={employeestatus.effective_date}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-base text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                    min={today} // Set minimum date as today to prevent past date selection
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="end_date"
                    className="block text-base font-medium text-gray-700"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    id="end_date"
                    value={employeestatus.end_date}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-base text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                    min={today} // Set minimum date as today to prevent past date selection
                  />
                </div>
              </div>

              {/* Updated By */}
              <div className="mb-4">
                <label
                  htmlFor="updated_by"
                  className="mb-1 block text-base font-medium text-gray-700"
                >
                  Updated By
                </label>
                <input
                  type="text"
                  name="updated_by"
                  id="updated_by"
                  value={employeestatus.updated_by}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-base text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Home/Non-Home Client */}
              <div className="mb-4">
                <label className="mb-1 block text-base font-medium text-gray-700">
                  Home/Non-Home Client
                </label>
                <div className="flex items-center space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="home_non_home_client"
                      value="y"
                      checked={employeestatus.home_non_home_client === "y"}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Home (Y)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="home_non_home_client"
                      value="n"
                      checked={employeestatus.home_non_home_client === "n"}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Non-Home (N)</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="text-white px-2 py-1 rounded bg-red-500 mr-4"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white px-3 py-1 rounded bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center" // Set the position to the center at the top
        autoClose={5000} // Auto close after 5 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={true} // Show the latest toast on top
        closeOnClick // Close when clicked
        rtl={false} // Support for right-to-left languages (false by default)
        pauseOnFocusLoss // Pause toast on focus loss
        draggable // Allow to drag to dismiss
        pauseOnHover // Pause when hovered
        style={{ maxWidth: "27rem", width: "100%" }}
      />
    </>
  );
};

export default AddEmployeeStatus;
