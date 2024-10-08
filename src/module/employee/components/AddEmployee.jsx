import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "tailwindcss/tailwind.css";
import Tooltip from '@mui/material/Tooltip';
import { useState, useEffect } from "react";
import EmployeeService from '../EmployeeService';
import { useNavigate } from 'react-router-dom';
import DepartmentService from '../../department/service/DepartmentService';
import PositionService from '../../position/service/PositionService';

const AddEmployee = ({ onClose }) => {
  const [employee, setEmployee] = useState({
    employee_code: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    marital_status: "",
    date_of_birth: "",
    gender: null,
    contact_number: "",
    email: "",
    address: "",
    joining_date: "",
    employee_emergency_contact: "",
    employeeStatus: { effective_date: "" }, 
    employeeWage: { base_rate: "", ot_rate: "", rate_type: "", effective_date: "" },
    departmentName: "",
    designationName: " ",
    person_id: "",
  });
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    DepartmentService.getAllDepartments()
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error('Error fetching departments:', error));
  }, []);

  useEffect(() => {
    PositionService.getAllPositions()
      .then((response) => setDesignations(response.data))
      .catch((error) => console.error('Error fetching designations:', error));
  }, []);


  const handleEmployeeChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };


  const handleEmployeeStatusChange = (e) => {
    setEmployee({
      ...employee,
      employeeStatus: {
        ...employee.employeeStatus,
        [e.target.name]: e.target.value,
      },
    });
  };


  const handleEmployeeWageChange = (e) => {
    setEmployee({
      ...employee,
      employeeWage: {
        ...employee.employeeWage,
        [e.target.name]: e.target.value,
      },
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = {
      ...employee,
    };

    console.log("Sending data to server:", employeeData);
    EmployeeService.saveEmployee(employeeData)
      .then((response) => {
        console.log("Employee added successfully:", response);
        navigate('/viewemployee');
      })
      .catch((error) => {
        console.error("Error adding employee:", error.response ? error.response.data : error.message);
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
        <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-col h-[95vh]">
          <div className="flex p-2  justify-between items-center border-b-2">
            <h2 className="text-xl font-semibold text-black">Add Employee</h2>

            <Tooltip title="close" arrow>
              <FontAwesomeIcon
                icon={faTimes}
                size="lg"
                onClick={onClose}
                className="cursor-pointer text-black"
              />
            </Tooltip>
          </div>
          <div className="flex-grow overflow-y-auto  text-black p-3">
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <div className="mr-2">
                  <div className="mb-2">
                    <label
                      htmlFor="first_name"
                      className="mb-1 block text-base font-medium text-gray-700"
                    >
                      First Name
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      value={employee.first_name}
                      onChange={handleEmployeeChange}
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium  outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <label
                      htmlFor="middle_name"
                      className="mb-1 block text-base font-medium text-gray-700"
                    >
                      Middle Name
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="middle_name"
                      id="middle_name"
                      value={employee.middle_name}
                      onChange={handleEmployeeChange}
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="ml-2">
                  <div className="mb-2">
                    <label
                      htmlFor="last_name"
                      className="mb-1 block text-base font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      value={employee.last_name}
                      onChange={handleEmployeeChange}
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
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
                  value={employee.email}
                  onChange={handleEmployeeChange}
                  placeholder="enter email"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium  outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="flex">
                <div className="w-full mr-8">
                  <div className="mb-2">
                    <label
                      htmlFor="contact"
                      className="mb-1 block text-base font-medium text-gray-700"
                    >
                      Contact-Number
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="contact_number"
                      id="contact_number"
                      value={employee.contact_number}
                      onChange={handleEmployeeChange}
                      placeholder="enter contact"
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium  outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="w-full ml-8">
                  <div className="mb-2">
                    <label
                      htmlFor="contact"
                      className="mb-1 block text-base font-medium text-gray-700"
                    >
                      Emergency-Contact-Number
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="employee_emergency_contact"
                      id="employee_emergency_contact"
                      value={employee.employee_emergency_contact}
                      onChange={handleEmployeeChange}
                      placeholder="enter contact"
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="Gender" className="block text-base font-medium text-gray-700">
                  Gender
                </label>
              </div>
              <div className="mb-2">
                <select
                  id="gender"
                  name="gender"
                  value={employee.gender || ""}
                  onChange={handleEmployeeChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
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
                  value={employee.address}
                  onChange={handleEmployeeChange}
                  placeholder="enter address"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium  outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-2 flex ">
                <div className="w-full mr-8">
                  <div className="mb-2 ">
                    <label
                      htmlFor="joining-date"
                      className="block text-base font-medium text-gray-700"
                    >
                      Joining-Date
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="date"
                      name="joining_date"
                      value={employee.joining_date}
                      onChange={handleEmployeeChange}
                      id="joining_date"
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="DesignationName"
                  className="block text-base font-medium text-gray-700"
                >
                  Designation-Name
                </label>
              </div>
              <div className="mb-2">
  <select
    id="designationId"
    name="designationName"
    value={employee.designationName}
    onChange={handleEmployeeChange}
    className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
  >
    <option value="" disabled>Select Designation</option>
    {designations.map(designation => (
      <option key={designation.position_id} value={designation.position_Name}>
        {designation.position_Name}
      </option>
    ))}
  </select>
</div>

              <div className="mb-2">
                <label
                  htmlFor="DepartmentName"
                  className="block text-base font-medium text-gray-700"
                >
                  Department-Name
                </label>
              </div>
              <div className="mb-2">
                <select
                  id="departmentId"
                  name="departmentName"
                  value={employee.departmentName}
                  onChange={handleEmployeeChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="" disabled>Select Department</option>
                  {departments.map(department => (
                    <option key={department.department_id} value={department.departmentName}>
                      {department.departmentName}
                    </option>
                  ))}

                </select>
              </div>
              <div className="flex">
                <div className="w-full mr-8">
                  <div className="mb-2">
                    <label
                      htmlFor="status"
                      className="mb-1 block text-base font-medium text-gray-700"
                    >
                      Marital Status
                    </label>
                  </div>
                  <div className="mb-2">
                    <select
                      name="status"
                      id="status"
                      value={employee.marital_status}
                      onChange={handleEmployeeChange}
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      aria-placeholder="select-status"
                    >
                      <option value="married">Married</option>
                      <option value="unmarried">Unmarried</option>

                    </select>
                  </div>
                </div>
                <div className="w-full ml-8">
                  <div className="mb-2">
                    <label
                      htmlFor="date_of_birth"
                      className="mb-1 block text-base font-medium text-gray-700"
                    >
                      Date-Of-Birth
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="date"
                      name="date_of_birth"
                      id="date_of_birth"
                      value={employee.date_of_birth}
                      onChange={handleEmployeeChange}
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            
              <div className="flex">
                <div className="w-full mr-8">
                  <div className="mb-2">
                    <label
                      htmlFor="Effective Date"
                      className="mb-1 block text-base font-medium text-gray-700"
                    >
                      Effective Date
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type=""
                      name="effective_date"
                      id="effective_date"
                      value={employee.employeeStatus.effective_date}
                      onChange={(e) => {
                        handleEmployeeWageChange(e); 
                        handleEmployeeStatusChange(e); 
                      }}
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="w-full ml-8">
                  <div className="mb-2">
                    <label
                      htmlFor="ot_rate "
                      className="mb-1 block text-base font-medium text-gray-700"
                    >
                      OT_Rate
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="ot_rate"
                      id="ot_rate"
                      value={employee.employeeWage.ot_rate}
                      onChange={handleEmployeeWageChange}
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="Base Rate"
                  className="mb-1 block text-base font-medium text-gray-700"
                >
                  Base Rate
                </label>
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="base_rate"
                  id="base_rate"
                  value={employee.employeeWage.base_rate}
                  onChange={handleEmployeeWageChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div> 
              <div className="mb-2">
                <label
                  htmlFor="rate_type"
                  className="mb-1 block text-base font-medium text-gray-700"
                >
                  Rate Type
                </label>
              </div>
              <div className="mb-2">
                <select
                  name="rate_type"
                  id="rate_type"
                  value={employee.employeeWage.rate_type}
                  onChange={handleEmployeeWageChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="">Select Rate Type</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Salary">Salary</option>
                </select>
              </div>

            </form>
          </div>
          <div className="flex justify-end items-center p-2 border-t-2">
            <button
              type="button"
              className="text-white px-3 py-1 rounded bg-red-500 mr-4 ml-4 "
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white px-3 py-1 mr-3 rounded bg-blue-500 "
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>)
};

export default AddEmployee;