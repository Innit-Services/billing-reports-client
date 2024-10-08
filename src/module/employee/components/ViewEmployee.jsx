import React, { useState, useEffect } from 'react';
import EmployeeService from '../EmployeeService';
import { useNavigate } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import EmployeeHeader from './EmployeeHeader';
import Pagination from "../../../shared/components/Pagination";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation";
import Notification from "../../../shared/components/Notification";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeTable from './EmployeeTable';  

const ViewEmployee = () => {
    const navigate = useNavigate();
    const [employeeList, setEmployeeList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(8);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    const [employeeToDelete, setEmployeeToDelete] = useState(null); 

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        EmployeeService.getAllEmployees()
            .then((res) => {
                setEmployeeList(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const confirmDeleteEmployee = (employee_code) => {
        setEmployeeToDelete(employee_code);
        setShowDeleteModal(true); 
    };

    const handleDeleteConfirm = () => {
        EmployeeService.delEmployee(employeeToDelete)
            .then(() => {
                init(); 
                toast.success("Employee deleted successfully."); 
            })
            .catch((error) => {
                console.error("Error deleting employee:", error);
                toast.error("Error deleting employee."); 
            });
        setShowDeleteModal(false); 
    };
    
    const handleDeleteCancel = () => {
        setShowDeleteModal(false); 
        setEmployeeToDelete(null); 
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const onSort = (e) => {
        setSortField(e.sortField);
        setSortOrder(e.sortOrder);
    };

    const sortedEmployees = (employeeList || []).sort((a, b) => {
        if (!sortField) return 0;

        const valueA = a[sortField];
        const valueB = b[sortField];

        if (valueA == null && valueB == null) return 0;
        if (valueA == null) return sortOrder === 1 ? 1 : -1;
        if (valueB == null) return sortOrder === 1 ? -1 : 1;

        let result = 0;

        if (typeof valueA === "string" && typeof valueB === "string") {
            result = valueA.localeCompare(valueB);
        } else if (typeof valueA === "number" && typeof valueB === "number") {
            result = valueA - valueB;
        } else {
            result = valueA > valueB ? 1 : -1;
        }
        return result * (sortOrder || 1);
    });

    const filteredEmployees = sortedEmployees.filter((employee) => {
        return (
            employee.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.contact_number.includes(searchQuery) ||
            employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.employeeStatus.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const firstRecordIndex = (currentPage - 1) * employeesPerPage;
    const paginatedEmployees = filteredEmployees.slice(firstRecordIndex, firstRecordIndex + employeesPerPage);

    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowClick = (employee_code) => {
        navigate(`/viewprofile/${employee_code}`);
    };

    return (
        <div className="flex h-screen w-full mx-auto">
            <Notification />
            <div className="relative p-0 w-full mx-auto">
                <div className="bg-white border border-gray-100 rounded-3 relative w-full h-[90vh] ">
                    <EmployeeHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} onAddClick={openForm} />
                    {isFormOpen && <AddEmployee onClose={closeForm} />}
                    
                    <EmployeeTable
                        employees={paginatedEmployees}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        onSort={onSort}
                        onRowClick={handleRowClick}
                        onDelete={confirmDeleteEmployee}
                    />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrevPage={handlePrevPage}
                        onNextPage={handleNextPage}
                        onPageChange={handlePageChange}
                    />

                    <DeleteConfirmation
                        show={showDeleteModal}
                        onClose={handleDeleteCancel}
                        onConfirm={handleDeleteConfirm}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewEmployee;
