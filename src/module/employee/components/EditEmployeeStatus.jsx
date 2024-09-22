import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import EmployeeService from "../EmployeeService";
import { Tooltip } from "@mui/material";

const EditEmployeeStatus = ({ employeeData, onClose, onUpdateSuccess }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: employeeData,
    mode: "onChange",
  });

  useEffect(() => {
    reset(employeeData);
  }, [employeeData, reset]);

  const onSubmit = async (data) => {
    try {
      console.log("Submitting data:", data);
      await EmployeeService.updateEmployeeStatus(data);
      toast.success("Employee status updated successfully.");
      if (onUpdateSuccess) {
        await onUpdateSuccess();
      }
      onClose();
    } catch (error) {
      console.error("Error updating employee status:", error);
      toast.error("Error updating employee status.");
      onClose();
    }
  };

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const homeNonHomeOptions = [
    { value: "y", label: "Home (Y)" },
    { value: "n", label: "Non-Home (N)" },
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-col h-[95vh] w-[30vw]">
          <div className="flex p-2 justify-between items-center border-b-2 text-black">
            <h2 className="text-xl font-semibold">Update Employee Status</h2>
            <Tooltip title="Close Form" arrow>
              <FontAwesomeIcon
                icon={faTimes}
                size="lg"
                onClick={onClose}
                className="cursor-pointer"
              />
            </Tooltip>
          </div>

          <div className="flex-grow overflow-y-auto p-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* CLIENT ID */}
              <div className="flex mb-2 w-1/1">
                <label
                  htmlFor="client_name"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Client Name :
                </label>
                <input
                  type="text"
                  {...register("client_name")}
                  className="w-1/2 rounded-md  border-gray-300 bg-white ml-10 px-1 text-base text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  disabled
                />
              </div>

              {/* STATUS */}
              <div className="mb-2">
                <label
                  htmlFor="status"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base  text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* EFFECTIVE DATE */}
              <div className="mb-4 flex space-x-2">
                <div className="w-1/2">
                  <label
                    htmlFor="effective_date"
                    className="block text-base font-medium  text-gray-700 mb-1"
                  >
                    Effective Date
                  </label>
                  <input
                    type="date"
                    {...register("effective_date")}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base  text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    disabled
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="end_date"
                    className="block text-base font-medium text-gray-700 mb-1"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    {...register("end_date")}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
              {/* UPDATED BY */}

              <div className=" flex  mb-3">
                <label
                  htmlFor="updated_by"
                  className="w-1/1 block text-base font-medium text-gray-700 mb-1"
                >
                  Updated By :
                </label>
                <input
                  type="text"
                  {...register("updated_by")}
                  className=" ml-10 rounded-md  bg-white  text-base  text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  disabled
                />
              </div>
              {/* HOME/NON-HOME */}
              <div className="mb-4">
                <label
                  htmlFor="home_non_home_client"
                  className="block text-base font-medium text-gray-700 mb-1"
                >
                  Home/Non-Home Client
                </label>
                <div className="flex items-center">
                  {homeNonHomeOptions.map((option) => (
                    <label
                      key={option.value}
                      className="inline-flex items-center mr-4"
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...register("home_non_home_client")}
                        className="form-radio text-indigo-600"
                        disabled
                      />
                      <span className="ml-2">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Footer with Cancel and Save buttons */}
          <footer className="flex justify-end rounded-b items-center p-2 border-t-2">
            <button
              type="button"
              className="text-white px-3 py-1 rounded bg-danger mr-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white px-3 py-1 rounded bg-primary"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default EditEmployeeStatus;
