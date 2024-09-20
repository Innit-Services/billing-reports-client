import React, { useState, useEffect, useRef } from "react";
import {
  FaPhone,
  FaEdit,
  FaArrowLeft,
  FaArrowRight,
  FaHome,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
//import UpdateEmployee from "./UpdateEmployee";
import EmployeeService from "../EmployeeService";
import "boxicons/css/boxicons.min.css";

const ViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const employeeDropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeService.getAllEmployees();
        const employeeList = response.data;
        setEmployees(employeeList);

        const currentEmployeeIndex = employeeList.findIndex(
          (emp) => emp.employee_code === id
        );
        if (currentEmployeeIndex !== -1) {
          setEmployee(employeeList[currentEmployeeIndex]);
          setCurrentIndex(currentEmployeeIndex);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        employeeDropdownRef.current &&
        !employeeDropdownRef.current.contains(event.target)
      ) {
        setEmployeeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevEmployee = employees[prevIndex];
      setEmployee(prevEmployee);
      setCurrentIndex(prevIndex);
      navigate(`/viewprofile/${prevEmployee.employee_code}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < employees.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextEmployee = employees[nextIndex];
      setEmployee(nextEmployee);
      setCurrentIndex(nextIndex);
      navigate(`/viewprofile/${nextEmployee.employee_code}`);
    }
  };

  const handleShowStatusModal = (person_id) => {
    navigate(`/viewemployeestatus/${person_id}`);
    //navigate(/employeestatus);
  };

  const handleShowDepartmentModal = () => {
    navigate("/department");
  };

  const handleShowPositionModal = () => {
    navigate("/position");
  };
  const handleShowWagesModal = () => {
    navigate("/position");
  };

  const handleSelectEmployee = (employeeCode) => {
    const selectedIndex = employees.findIndex(
      (emp) => emp.employee_code === employeeCode
    );
    if (selectedIndex !== -1) {
      setEmployee(employees[selectedIndex]);
      setCurrentIndex(selectedIndex);
      navigate(`/viewprofile/${employeeCode}`);
      setEmployeeDropdownOpen(false);
    }
  };

  const toggleForm = () => setShowForm(!showForm);
  const handleCloseForm = () => setShowForm(false);

  const updateEmployee = (updatedData) => {
    setEmployee(updatedData);
  };

  return (
    <div className="h-screen  ">
      <div className={`relative ${showForm ? "blur" : ""}`}>
        <nav className="text-white p-2 flex flex-wrap items-center justify-between shadow border border-custom-dark-blue rounded-t-lg bg-custom-dark-blue">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold ps-3">Employee Profile</h3>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="bg-transparent border-2 border-gray p-2 rounded hover:bg-blue-500 flex items-center"
              >
                Summary
                <i className="bx bx-chevron-down ml-2"></i>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md w-48 z-10 border border-gray-300">
                  <div
                    onClick={(e) =>
                      handleShowStatusModal(employee?.employeeStatus?.person_id)
                    }
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    Status
                  </div>
                  <div
                    onClick={handleShowDepartmentModal}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    Department
                  </div>
                  <div
                    onClick={handleShowPositionModal}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    Position
                  </div>
                  <div
                    onClick={handleShowWagesModal}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    Wages
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-grow justify-center items-center space-x-4">
            {/* <a href="/viewemployee" className="text-white hover:underline">List</a> */}
            <button
              className="bg-transparent border border-black p-2 cursor-pointer rounded hover:bg-gray-700"
              onClick={handlePrev}
              disabled={currentIndex <= 0}
            >
              <FaArrowLeft />
            </button>
            <div ref={employeeDropdownRef} className="relative">
              <button
                className="border border-black p-2 rounded hover:bg-blue-500"
                onClick={() => setEmployeeDropdownOpen((prev) => !prev)}
              >
                {employee
                  ? `${employee.employee_code} ${employee.first_name} ${employee.last_name}`
                  : "Select Employee"}
              </button>
              {employeeDropdownOpen && (
                <div className="absolute mt-2  bg-white shadow-md rounded-md w-[10vw] h-[20vh] overflow-y-scroll z-10 border border-gray-300">
                  {employees.map((emp) => (
                    <div
                      key={emp.employee_code}
                      onClick={() => handleSelectEmployee(emp.employee_code)}
                      className="cursor-pointer  text-black p-2 hover:bg-blue-400"
                    >
                      {emp.employee_code} {emp.first_name} {emp.last_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className="bg-transparent border border-black p-2 rounded me-5"
              onClick={handleNext}
              disabled={currentIndex >= employees.length - 1}
            >
              <FaArrowRight />
            </button>
          </div>
        </nav>

        <div className="h-[80vh] bg-white shadow-md rounded-b-lg p-6 pt-1 overflow-x-hidden overflow-y-auto">
          <div className="flex flex-col md:flex-row md:space-x-8 shadow-sm pt-4">
            <div className="flex flex-col items-start ms-5 md:w-1/4 ">
              <img
                src="https://via.placeholder.com/150"
                alt="Employee"
                className="rounded-full w-32 h-32"
              />

              <h5 className="mt-2 text-lg items-start ms-3 font-semibold">
                {employee?.first_name} {employee?.last_name}
              </h5>

              <button
                className="mt-1 mb-2 border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-500 hover:text-white"
                onClick={toggleForm}
              >
                Edit Profile
              </button>
            </div>
            <div className="md:w-1/2 space-y-4 flex flex-col md:space-y-0">
              <div className="flex flex-col md:flex-row md:justify-between  space-y-2">
                <p>
                  <strong>Employee ID:</strong> {employee?.employee_code}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {employee?.date_of_birth}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between space-y-2 ">
                <p>
                  <strong>Full Name:</strong> {employee?.first_name}{" "}
                  {employee?.middle_name} {employee?.last_name}
                </p>
                <p>
                  <strong>Marital Status:</strong> {employee?.marital_status}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between ">
                <p>
                  <strong>Email Id:</strong> {employee?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 shadow-sm md:grid-cols-4 gap-2 mt-1 p-4">
            <div className="border-gray-500">
              <h3 className="text-lg font-semibold mb-3">CONTACT DETAILS</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <FaPhone className="mr-2 text-blue-500" />
                  <p>
                    <strong>Contact:</strong> {employee?.contact_number}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaPhone className="mr-2 text-blue-500" />
                  <p>
                    <strong>Emergency Contact:</strong>{" "}
                    {employee?.employee_emergency_contact}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaHome className="mr-2 text-blue-500" />
                  <p>
                    <strong>Current Address:</strong> {employee?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-1 md:grid-cols-4 gap-2 border-gray-400  shadow-sm  p-4">
            <div className="w-[50vw]">
              <h3 className="text-lg font-semibold mb-3">OTHER DETAILS</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-wrap justify-between w-full">
                  <p className="  min-w-[200px]">
                    <strong>Job Status:</strong>{" "}
                    {employee?.employeeStatus?.status}
                  </p>
                  <p
                    onClick={(e) => handleShowDepartmentModal(e.data.person_id)}
                    className="cursor-pointer min-w-[100px] "
                  >
                    <strong>Department:</strong> {employee?.departmentName}
                  </p>
                  <p
                    onClick={handleShowPositionModal}
                    className="cursor-pointer min-w-[100px]"
                  >
                    <strong>Designation:</strong> {employee?.designationName}
                  </p>
                </div>

                <div className="flex flex-wrap justify-between w-[30vw]">
                  <p className=" min-w-[100px]">
                    <strong>Location:</strong> {employee?.address}
                  </p>
                  <p className=" min-w-[100px]">
                    <strong>Gender:</strong> {employee?.gender}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <UpdateEmployee
        show={showForm}
        handleClose={handleCloseForm}
        employee={employee}
        updateEmployee={updateEmployee}
      /> */}
    </div>
  );
};

export default ViewProfile;