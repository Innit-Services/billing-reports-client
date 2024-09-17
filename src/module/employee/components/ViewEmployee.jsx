import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { setSort, fetchEmployees, setSearchQuery,setSortField, setSortOrder, setPage, deleteEmployee as deleteEmployeeAction } from '../EmployeeSlice';
import { useNavigate } from "react-router-dom";
// import Add from "./Add";
import AddEmployee from "./AddEmployee";
import Search from "../../../shared/components/Search.jsx";
import Filter from "../../../shared/components/Filter.jsx";
import Pagination from "../../../shared/components/Pagination.jsx";
import { Outlet } from "react-router-dom"; 

const ViewEmployee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { employees, searchQuery, sortField, sortOrder,status, currentPage, employeesPerPage } = useSelector(state => state.employee);
    
    const [isFormOpen, setIsFormOpen] = useState(false);
    
    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    useEffect(() => {
        console.log('Employee prop changed:', employees);
        if (status === 'idle') {
            dispatch(fetchEmployees());
        }
        console.log(employees);
    }, [status, dispatch,employees]);


    const handleDetailClick = (id) => {
        navigate(`/viewprofile/${id}`);
    }

    const deleteEmployee = (employee_code) => {
        EmployeeService.delEmployee(employee_code)
          .then(() => {
            dispatch(fetchEmployees()); 
          })
          .catch((error) => {
            console.log(error);
          });
      };

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const onSort = (e) => {
        dispatch(setSort({ sortField: e.sortField, sortOrder: e.sortOrder }));
      };

    const sortedEmployees = [...(employees || [])].sort((a, b) => {
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
      employee?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.departmentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.contact_number?.includes(searchQuery) ||
      employee?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.employeeStatus?.status
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });


    const firstRecordIndex = (currentPage - 1) * employeesPerPage;
    const paginatedEmployees = filteredEmployees.slice(firstRecordIndex, firstRecordIndex + employeesPerPage);

    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) dispatch(setPage(currentPage - 1));
    };
    
    const handleNextPage = () => {
        if (currentPage < totalPages) dispatch(setPage(currentPage + 1));
    };

    return (
        <div className="flex h-screen w-full mx-auto">
            <div className="relative p-0 w-full mx-auto">
                <div className="bg-white border border-gray-100 rounded-3 relative w-full h-[90vh] ">
                    <div className="flex justify-between border border-custom-dark-blue rounded-t-lg  text-white items-center  bg-custom-dark-blue" >
                        <h2 className="flex-grow p-3 fs-5 font-bold ">Employees</h2>
                        <div className="flex mt-2">
                            <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                            {/* <Add onAddClick={() => { }} /> */}
                            <button
                                type="button"
                                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-[3vw]"
                                onClick={openForm}
                            >
                                <i class='bx bx-plus p-1'></i>
                            </button>

                            {isFormOpen && <AddEmployee onClose={closeForm} />}
                            <Filter onFilterClick={() => { }} />
                        </div>
                    </div>

                    <DataTable
                        value={paginatedEmployees}
                        onSort={onSort}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        className="border-gray-500"
                        rowClassName=" border border-gray-600 hover-row cursor-pointer "
                    // onRowClick={(e) => handleDetailClick(e.data.employee_code)}
                    >
                        <Column field="employee_code"
                            header="ID"
                            sortable
                            headerClassName="p-2 ps-3"
                            className="py-2 px-3 "
                            body={(e) => (
                                <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleDetailClick(e.employee_code)}
                                >
                                    {e.employee_code}
                                </span>
                            )}
                        />
                        <Column field="first_name" header="FIRST NAME" sortable headerClassName="p-2" className="py-2 px-2" />
                        <Column field="last_name" header="LAST NAME" sortable headerClassName="p-2" className="py-2 px-2" />
                        <Column field="contact_number" header="CONTACT" sortable headerClassName="p-2" className="py-2 px-2" />
                        <Column field="email" header="EMAIL ID" sortable headerClassName="p-2" className="py-2 px-2" />
                        <Column field="departmentName" header="DEPARTMENT" sortable headerClassName="p-2" className="py-2 px-2" />
                        <Column field="employeeStatus.status" header="STATUS" sortable headerClassName="p-2" className="py-2 px-2" />
                        <Column
                            header="ACTION"
                            body={(e) => (
                                <button
                                    className="p-0 me-1 ms-2 border-0 bg-transparent rounded"
                                    onClick={() => deleteEmployee(e.employee_code)}
                                >
                                    <i className="bx bxs-trash text-blue-700"></i>
                                </button>
                            )}
                            className="py-2 px-2"
                        />
                    </DataTable>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrevPage={handlePrevPage}
                        onNextPage={handleNextPage}
                    />
                       <Outlet />
                </div>
            </div>
         
        </div>
    );
};
export default ViewEmployee;