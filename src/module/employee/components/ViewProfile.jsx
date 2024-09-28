import React, { useState, useEffect, useRef } from 'react';
import { FaPhone, FaEdit, FaChevronDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateEmployee from './UpdateEmployee';
import EmployeeService from '../EmployeeService';
import 'boxicons/css/boxicons.min.css';


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

                const currentEmployeeIndex = employeeList.findIndex(emp => emp.employee_code === id);
                if (currentEmployeeIndex !== -1) {
                    setEmployee(employeeList[currentEmployeeIndex]);
                    setCurrentIndex(currentEmployeeIndex);
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (employeeDropdownRef.current && !employeeDropdownRef.current.contains(event.target)) {
                setEmployeeDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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

    const handleShowStatusModal = () => {
        navigate("/employeestatus");
    };

    const handleShowDepartmentModal = () => {
        navigate("/departmentdetails");
    };

    const handleShowPositionModal = () => {
        navigate("/position");
    };

    const handleSelectEmployee = (employeeCode) => {
        const selectedIndex = employees.findIndex(emp => emp.employee_code === employeeCode);
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
        <div className="h-screen w-full  bg-white mx-auto">

            <nav className="text-black flex items-center justify-between px-5 py-2 border rounded-t-lg border-custom-dark-blue bg-custom-dark-blue w-full">
                <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold justify-items-start">Employee Profile</h3>
                </div>
                <div className="flex items-center space-x-1 justify-end">
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(prev => !prev)}
                            className="bg-transparent border-gray p-2 rounded hover:bg-blue-500 flex items-center"
                        >
                            Summary
                            <i className="bx bx-chevron-down ml-2"></i>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white text-black shadow-sm w-48 z-10 border border-gray-300">
                                <div onClick={handleShowStatusModal} className="cursor-pointer p-2 hover:bg-gray-100">
                                    Status
                                </div>
                                <div onClick={handleShowDepartmentModal} className="cursor-pointer p-2 hover:bg-gray-100">
                                    Department
                                </div>
                                <div onClick={handleShowPositionModal} className="cursor-pointer p-2 hover:bg-gray-100">
                                    Position
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        className="bg-transparent border border-black p-2 cursor-pointer rounded hover:bg-gray-700"
                        onClick={handlePrev}
                        disabled={currentIndex <= 0}
                    >
                        <FaArrowLeft />
                    </button>
                    <div ref={employeeDropdownRef} className="relative">
                        <button className="border-black p-2 rounded hover:bg-blue-500" onClick={() => setEmployeeDropdownOpen(prev => !prev)}>
                            {employee ? `${employee.employee_code} ${employee.first_name} ${employee.last_name}` : 'Select Employee'}
                        </button>
                        {employeeDropdownOpen && (
                            <div className="absolute mt-2 bg-white shadow-md rounded-md w-[10vw] h-[20vh] overflow-y-scroll z-10 border border-gray-300">
                                {employees.map(emp => (
                                    <div
                                        key={emp.employee_code}
                                        onClick={() => handleSelectEmployee(emp.employee_code)}
                                        className="cursor-pointer text-black p-2 hover:bg-blue-400"
                                    >
                                        {emp.employee_code} {emp.first_name} {emp.last_name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="bg-transparent border border-black p-2 rounded" onClick={handleNext} disabled={currentIndex >= employees.length - 1}>
                        <FaArrowRight />
                    </button>
                </div>
            </nav>
            <div className="row h-full mt-1 overflow-scroll">
                <div className="col-md-3 shadow-lg flex flex-col items-center py-4 p-5">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Employee"
                        className="rounded-full w-28 h-28 bg-gray-50"
                    />
                    <h1 className="font-bold py-2">{employee?.first_name} {employee?.last_name}</h1>
                    <button className="mt-2 mb-4 border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-500 hover:text-white flex items-center" onClick={toggleForm}>
                        <FaEdit className="mr-2" /> Edit Profile
                    </button>
                    <div className="text-center w-full">
                        <h2 className="font-bold">Contact</h2>
                        <p className="text-gray-600">{employee?.contact_number}</p>
                        <h2 className="font-bold mt-3">Email</h2>
                        <p className="text-gray-600">{employee?.email}</p>
                        <h2 className="font-bold mt-3">Address</h2>
                        <p className="text-gray-600">{employee?.address}</p>
                    </div>
                </div>

                <div className="col-md-9 bg-white">
                    <div className="shadow-sm mb-1">
                        <h1 className="font-bold text-lg bg-gray-100 p-2">Basic Details</h1>
                        <table className="table">
                            <tbody>
                                <tr className="border-0">
                                    <th className="border-0 font-semibold">Employee Id</th>
                                    <td className="border-0 d-flex justify-content-between align-items-center">
                                        <span>{employee?.employee_code}</span>

                                    </td>
                                </tr>
                                <tr className="border-0">
                                    <th className="border-0 font-semibold">Full Name</th>
                                    <td className="border-0 d-flex justify-content-between align-items-center">
                                        <span>{employee?.first_name} {employee?.middle_name} {employee?.last_name}</span>

                                    </td>
                                </tr>
                                <tr className="border-0">
                                    <th className="border-0 font-semibold">Date of Birth</th>
                                    <td className="border-0 d-flex justify-content-between align-items-center">
                                        <span>{employee?.date_of_birth}</span>

                                    </td>
                                </tr>
                                <tr className="border-0">
                                    <th className="border-0 font-semibold">Gender</th>
                                    <td className="border-0 d-flex justify-content-between align-items-center">
                                        <span>{employee?.gender}</span>

                                    </td>
                                </tr>
                                <tr className="border-0">
                                    <th className="border-0 font-semibold">Marital Status</th>
                                    <td className="border-0 d-flex justify-content-between align-items-center">
                                        <span>{employee?.marital_status}</span>

                                    </td>
                                </tr>
                                <tr className="border-0">
                                    <th className="border-0 font-semibold">Emergency Contact</th>
                                    <td className="border-0 d-flex justify-content-between align-items-center">
                                        <span>{employee?.employee_emergency_contact}</span>
                                        <i className="bx bx-edit text-blue-600" style={{ cursor: "pointer" }} onClick={() => handleEdit('emergencyContact')}></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <div className="shadow-sm mb-1">
                        <h1 className="font-bold text-lg bg-gray-100 p-2">Other Details</h1>
                        <table className="table">
                            <tbody>
                                <tr className="border-0">
                                    <th className="border-0 font-semibold">Job Status</th>
                                    <td className="border-0 d-flex justify-content-between align-items-center">
                                        <span>{employee?.employeeStatus?.status}</span>
                                        <i className="bx bx-edit text-blue-600" style={{ cursor: "pointer" }}></i>
                                    </td>
                                </tr>
                                <tr className="border-0">
                                    <th className="border-0 font-semibold">Department</th>
                                    <td className="border-0 d-flex justify-content-between align-items-center">
                                        <span>{employee?.departmentName}</span>
                                        <i className="bx bx-edit text-blue-600" style={{ cursor: "pointer" }} ></i>
                                    </td>
                                </tr>
                                <tr className="border-0">
                                    <th className="border-0 font-semibold">Designation Name</th>
                                    <td className="border-0 d-flex justify-content-between align-items-center">
                                        <span>{employee?.designationName}</span>
                                        <i className="bx bx-edit  text-blue-600" style={{ cursor: "pointer" }} ></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                </div>
            </div>
            <UpdateEmployee
                show={showForm}
                handleClose={handleCloseForm}
                employee={employee}
                updateEmployee={updateEmployee}
            />
        </div>
    );
};

export default ViewProfile;
