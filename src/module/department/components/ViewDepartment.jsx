import React, { useState, useEffect } from 'react';
import DepartmentService from '../../department/service/DepartmentService';
import Search from '../../../shared/components/Search';
import Filter from '../../../shared/components/Filter';
import AddDepartment from './AddDepartment';
import UpdateDepartment from './UpdateDepartment';
import Pagination from '../../../shared/components/Pagination';     
import Tooltip from '@mui/material/Tooltip';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from '../../../shared/components/Notification';
import DepartmentTable from './DepartmentTable';

const ViewDepartment = () => {
    const [departmentList, setDepartmentList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [departmentsPerPage] = useState(6);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [departmentToDelete, setDepartmentToDelete] = useState(null);

    useEffect(() => {
        const fetchDepartments = () => {
            DepartmentService.getAllDepartments()
                .then((res) => {
                    setDepartmentList(res.data);
                })
                .catch(() => {
                    toast.error('Failed to fetch departments.');
                });
        };

        fetchDepartments(); 
        const intervalId = setInterval(fetchDepartments, 10000);

        return () => clearInterval(intervalId); 
    }, []);

    const handleDeleteClick = (department) => {
        setDepartmentToDelete(department);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = () => {
        DepartmentService.deleteDepartmentByName(departmentToDelete.departmentName)
            .then(() => {
                toast.success(`Department "${departmentToDelete.departmentName}" deleted successfully.`);
                setShowDeleteConfirm(false);
            })
            .catch(() => {
                toast.error('Error deleting department.');
                setShowDeleteConfirm(false);
            });
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const onSort = (e) => {
        setSortField(e.sortField);
        setSortOrder(e.sortOrder);
    };

    const filteredDepartments = departmentList.filter((department) => {
        return department.departmentName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const paginatedDepartments = filteredDepartments.slice(
        (currentPage - 1) * departmentsPerPage,
        currentPage * departmentsPerPage
    );

    const totalPages = Math.ceil(filteredDepartments.length / departmentsPerPage);

    return (
        <div className="flex h-screen w-full mx-auto">
            <Notification />
            <div className="relative w-full mx-auto">
                <div className="bg-white border border-gray-100 rounded-t-lg relative w-full h-[95vh]">
                    <div className="flex justify-between border border-custom-dark-blue rounded-t-lg text-white items-center bg-custom-dark-blue p-2">
                        <h2 className="flex-grow font-bold text-xl">Departments</h2>
                        <div className="flex">
                            <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                            <Tooltip title="Add Department">
                                <button
                                    type="button"
                                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-2 me-2 mb-2"
                                    onClick={() => setIsFormOpen(true)}
                                >
                                    <i className="bx bx-plus fs-6 text-md"></i>
                                </button>
                            </Tooltip>
                            {isFormOpen && <AddDepartment onClose={() => setIsFormOpen(false)} />}
                            <Filter />
                        </div>
                    </div>
                    <DepartmentTable
                        departments={paginatedDepartments}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        onSort={onSort}
                        onDeleteClick={handleDeleteClick}
                        onRowClick={(department) => {
                            setSelectedDepartment(department);
                            setIsUpdateFormOpen(true);
                        }}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        onNextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    />
                </div>
            </div>

            {isUpdateFormOpen && (
                <UpdateDepartment
                    department={selectedDepartment}
                    onClose={() => setIsUpdateFormOpen(false)}
                    onUpdateSuccess={(updatedDepartment) => {
                        // Update the department list with the updated department
                        setDepartmentList(departmentList.map(dep => 
                            dep.department_id === updatedDepartment.department_id ? updatedDepartment : dep
                        ));
                        toast.success('Department updated successfully.');
                        setIsUpdateFormOpen(false);
                    }}
                />
            )}

            <DeleteConfirmation
                show={showDeleteConfirm}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
};

export default ViewDepartment;