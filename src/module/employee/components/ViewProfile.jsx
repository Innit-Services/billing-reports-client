import React, { useState, useEffect, useRef } from 'react';
import { FaPhone, FaEdit, FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UpdateEmployee from './UpdateEmployee';
// import EmployeeService from '../EmployeeService';
import { fetchEmployees, setCurrentEmployee } from '../EmployeeSlice';
import 'boxicons/css/boxicons.min.css';

const ViewProfile = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const [showForm, setShowForm] = useState(false);
    // const [employees, setEmployees] = useState([]);
    // const [employee, setEmployee] = useState(null);
    // const [currentIndex, setCurrentIndex] = useState(-1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const employeeDropdownRef = useRef(null);

    const employees = useSelector(state => state.employee.employees);
    const currentEmployee = useSelector(state => state.employee.currentEmployee);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await EmployeeService.getAllEmployees();
    //             const employeeList = response.data;
    //             setEmployees(employeeList);

    //             const currentEmployeeIndex = employeeList.findIndex(emp => emp.employee_code === id);
    //             if (currentEmployeeIndex !== -1) {
    //                 setEmployee(employeeList[currentEmployeeIndex]);
    //                 setCurrentIndex(currentEmployeeIndex);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching employee data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [id]);


    useEffect(() => {
        dispatch(fetchEmployees()); // Fetch all employees on component mount
    }, [dispatch]);

    useEffect(() => {
        if (employees.length > 0) {
            const employee = employees.find(emp => emp.employee_code === id);
            if (employee) {
                dispatch(setCurrentEmployee(id)); // Set the current employee based on URL id
            }
        }
    }, [id, employees, dispatch]);

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
        const currentIndex = employees.findIndex(emp => emp.employee_code === currentEmployee?.employee_code);
        if (currentIndex > 0) {
            // const prevIndex = currentIndex - 1;
            // const prevEmployee = employees[prevIndex];
            // setEmployee(prevEmployee);
            // setCurrentIndex(prevIndex);
            const prevEmployee = employees[currentIndex - 1];
            dispatch(setCurrentEmployee(prevEmployee.employee_code));
            navigate(`/viewprofile/${prevEmployee.employee_code}`);
        }
    };

    const handleNext = () => {
        const currentIndex = employees.findIndex(emp => emp.employee_code === currentEmployee?.employee_code);
        if(currentIndex < employees.length - 1) {
            const nextEmployee = employees[currentIndex + 1];
            // const nextIndex = currentIndex + 1;
            // const nextEmployee = employees[nextIndex];
            // setEmployee(nextEmployee);
            // setCurrentIndex(nextIndex);
            dispatch(setCurrentEmployee(nextEmployee.employee_code));
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

    // const handleSelectEmployee = (employeeCode) => {
    //     const selectedIndex = employees.findIndex(emp => emp.employee_code === employeeCode);
    //     if (selectedIndex !== -1) {
    //         setEmployee(employees[selectedIndex]);
    //         setCurrentIndex(selectedIndex);
    //         navigate(`/viewprofile/${employeeCode}`);
    //         setEmployeeDropdownOpen(false);
    //     }
    // };

    const handleSelectEmployee = (employeeCode) => {
        dispatch(setCurrentEmployee(employeeCode));
        navigate(`/viewprofile/${employeeCode}`);
        setEmployeeDropdownOpen(false);
    };

    const toggleForm = () => setShowForm(!showForm);
    const handleCloseForm = () => setShowForm(false);

    const updateEmployee = (updatedData) => {
        setEmployee(updatedData);
    };

    return (
        <div className="h-screen" >
            <div className={`relative ${showForm ? 'blur' : ''}`}>
                <nav className="text-white p-1 flex flex-wrap items-center justify-between shadow border rounded-t-lg border-custom-dark-blue  bg-custom-dark-blue">
                    <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold ps-3 pe-5">Employee Profile</h3>
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(prev => !prev)}
                                className="bg-transparent border-2 border-gray p-2 rounded hover:bg-blue-500 flex items-center"
                            >
                                Summary
                                <i className="bx bx-chevron-down ml-2"></i>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 bg-white text-black shadow-lg  w-48 z-10 border border-gray-300">
                                    <div
                                        onClick={handleShowStatusModal}
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
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-grow justify-center items-center space-x-4">
                        {/* <a href="/viewemployee" className="text-white hover:underline">List</a> */}
                        <button
                            className="bg-transparent border border-black p-2 cursor-pointer rounded hover:bg-gray-700"
                            onClick={handlePrev}
                            disabled={!currentEmployee || employees.findIndex(emp => emp.employee_code === currentEmployee.employee_code) <= 0}
                            // disabled={currentIndex <= 0}
                        >
                            <FaArrowLeft />
                        </button>
                        <div ref={employeeDropdownRef} className="relative">
                            <button
                                className="border border-black p-2 rounded hover:bg-blue-500"
                                onClick={() => setEmployeeDropdownOpen(prev => !prev)}

                            >
                                {/* {employee ?`${employee.employee_code} ${employee.first_name}${employee.last_name} `: 'Select Employee'} */}
                                {currentEmployee ? `${currentEmployee.employee_code} ${currentEmployee.first_name} ${currentEmployee.last_name}` : 'Select Employee'}
                            </button>
                            {employeeDropdownOpen && (
                                <div className="absolute mt-2  bg-white shadow-md rounded-md w-[10vw] h-[20vh] overflow-y-scroll z-10 border border-gray-300">
                                    {employees.map(emp => (
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
                            // disabled={currentIndex >= employees.length - 1}
                            disabled={!currentEmployee || employees.findIndex(emp => emp.employee_code === currentEmployee.employee_code) >= employees.length - 1}
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                </nav>


                <div className="h-[85vh] bg-white pt-1 overflow-x-hidden overflow-y-auto">
                    <div className="flex flex-col md:flex-row md:space-x-8 shadow-sm pt-4">


                        <div className="flex flex-col items-start ms-5 md:w-1/4 ">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Employee"
                                className="rounded-full w-32 h-32 p-5 bg-gray-200"
                            />

                            <h5 className="mt-2 text-lg items-start ms-3 font-semibold">{currentEmployee?.first_name} {currentEmployee?.last_name}</h5>

                            <button
                                className="mt-1 mb-2 border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-500 hover:text-white"
                                onClick={toggleForm}
                            >
                                Edit Profile
                            </button>
                        </div>
                        <div className="md:w-1/2 space-y-4 flex flex-col md:space-y-0">
                            <div className="flex flex-col md:flex-row md:justify-between  space-y-2">
                                <p><strong>Employee ID:</strong> {currentEmployee?.employee_code}</p>
                                <p><strong>Date of Birth:</strong> {currentEmployee?.date_of_birth}</p>
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between space-y-2 ">
                                <p><strong>Full Name:</strong> {currentEmployee?.first_name} {currentEmployee?.middle_name} {currentEmployee?.last_name}</p>
                                <p><strong>Marital Status:</strong> {currentEmployee?.marital_status}</p>
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between ">
                                <p><strong>Email Id:</strong> {currentEmployee?.email}</p>
                            </div>
                        </div>

                    </div>
                    <div className="grid grid-cols-1 shadow-sm md:grid-cols-4 gap-2 mt-1 p-4">
                        <div className="border-gray-500">
                            <h3 className="text-lg font-semibold mb-3">CONTACT DETAILS</h3>
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center">
                                    <FaPhone className="mr-2 text-blue-500" />
                                    <p><strong>Contact:</strong> {currentEmployee?.contact_number}</p>
                                </div>
                                <div className="flex items-center">
                                    <FaPhone className="mr-2 text-blue-500" />
                                    <p><strong>Emergency Contact:</strong> {currentEmployee?.employee_emergency_contact}</p>
                                </div>
                                <div className="flex items-center">
                                    <FaHome className="mr-2 text-blue-500" />
                                    <p><strong>Current Address:</strong> {currentEmployee?.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mt-1 md:grid-cols-4 gap-2 border-gray-400  shadow-sm  p-4" >
                        <div className="w-[50vw]">
                            <h3 className="text-lg font-semibold mb-3">OTHER DETAILS</h3>
                            <div className="flex flex-col space-y-2">
                                <div className="flex flex-wrap justify-between w-full">
                                    <p onClick={handleShowStatusModal} className="cursor-pointer  min-w-[200px]"><strong>Job Status:</strong> {currentEmployee?.employeeStatus?.status}</p>
                                    <p onClick={handleShowDepartmentModal} className="cursor-pointer min-w-[100px] "><strong>Department:</strong> {currentEmployee?.departmentName}</p>
                                    <p onClick={handleShowPositionModal} className="cursor-pointer min-w-[100px]"><strong>Designation:</strong> {currentEmployee?.designationName}</p>
                                </div>


                                <div className="flex flex-wrap justify-between w-[30vw]">
                                    <p className=" min-w-[100px]"><strong>Location:</strong> {currentEmployee?.address}</p>
                                    <p className=" min-w-[100px]"><strong>Gender:</strong> {currentEmployee?.gender}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <UpdateEmployee
                show={showForm}
                handleClose={handleCloseForm}
                employee={currentEmployee}
                updateEmployee={updateEmployee}
                onClose={handleCloseForm}
            />
        </div>
    );
};

export default ViewProfile;
