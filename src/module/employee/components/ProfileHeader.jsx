import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../EmployeeService';

const ProfileHeader = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);


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


    const handleSelectEmployee = (employeeCode) => {
        const selectedIndex = employees.findIndex(emp => emp.employee_code === employeeCode);
        if (selectedIndex !== -1) {
            setEmployee(employees[selectedIndex]);
            setCurrentIndex(selectedIndex);
            navigate(`/viewprofile/${employeeCode}`);
            setDropdownOpen(false);
        }
    };

    return (
        <nav className="bg-white flex items-center justify-between px-5 py-2 border-b border-gray-200 rounded-t-lg">
            <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold">Employee Profile</h3>
            </div>
            <div className="flex items-center space-x-2">
                
                <button
                    className="bg-transparent border border-gray-400 text-gray-700 p-2 rounded-md transition duration-200 hover:bg-gray-100"
                    onClick={handlePrev}
                    disabled={currentIndex <= 0}
                >
                    <FaArrowLeft />
                </button>

                <div ref={dropdownRef} className="relative">
                    <button
                        className="border border-gray-400 text-gray-700 p-2 rounded-md transition duration-200 hover:bg-blue-200 flex items-center"
                        onClick={() => setDropdownOpen((prev) => !prev)}
                    >
                        {employee ? `${employee.employee_code} ${employee.first_name} ${employee.last_name}` : 'Select Employee'}
                    </button>
                    {dropdownOpen && (
                        <div className="absolute mt-1 bg-white shadow-lg rounded-md w-60 max-h-60 overflow-y-auto z-10 border border-gray-300">
                            {employees.map((emp) => (
                                <div
                                    key={emp.employee_code}
                                    onClick={() => handleSelectEmployee(emp.employee_code)}
                                    className="cursor-pointer p-2 hover:bg-blue-100"
                                >
                                    {emp.employee_code} {emp.first_name} {emp.last_name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    className="bg-transparent border border-gray-400 text-gray-700 p-2 rounded-md transition duration-200 hover:bg-gray-100"
                    onClick={handleNext}
                    disabled={currentIndex >= employees.length - 1}
                >
                    <FaArrowRight />
                </button>
            </div>
        </nav>
    );
};

export default ProfileHeader;
