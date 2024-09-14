import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import EmployeeService from '../EmployeeService';
import { useNavigate } from "react-router-dom";
import Add from "./Add";
// import AddEmployee from "./AddEmployee";
import Search from "../../../shared/components/Search";
import Filter from "../../../shared/components/Filter";
import Pagination from "../../../shared/components/Pagination";


const ViewEmployee = () => {
    const navigate = useNavigate();
    const [employeeList, setEmployeeList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(8);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
   

    const handleDetailClick = (id) => {
        navigate(`/viewprofile/${id}`);
    }

    // const demoHandle=()=>{
    //     navigate('/demo');
    // }

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

    const deleteEmployee = (employee_code) => {
        EmployeeService.delEmployee(employee_code)
            .then(() => {
                init();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const onSort = (e) => {
        setSortField(e.sortField);
        setSortOrder(e.sortOrder);
    };

    const sortedEmployees = [...employeeList].sort((a, b) => {
        if (!sortField) return 0;
        const valueA = a[sortField];
        const valueB = b[sortField];
        let result = 0;

        if (valueA < valueB) result = -1;
        if (valueA > valueB) result = 1;
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

    return (
        <div className="flex h-[70vh] w-full mx-auto">
            <div className="relative w-full mx-auto">
                <div className="bg-white border border-gray-100 rounded-3 relative w-full h-[85vh]">
                    {/* added bg-custom-dark-blue class to give 2c3e50 color to content header,this class is from tailwind config */}
                    <div className="flex justify-between border border-custom-dark-blue rounded-3 text-white items-center  bg-custom-dark-blue" >
                        <h2 className="flex-grow p-3 fs-5 font-bold ">Employees</h2>
                        <div className="flex">
                            <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                            <Add onAddClick={() => { }} />
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
                        onRowClick={(e) => handleDetailClick(e.data.employee_code)}
                    >
                        <Column field="employee_code" header="ID" sortable headerClassName="p-2 ps-3" className="py-2 px-3 " />
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
                    {/* <button onClick={(demoHandle)}> click</button> */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrevPage={handlePrevPage}
                        onNextPage={handleNextPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewEmployee;





