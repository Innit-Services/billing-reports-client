import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import EmployeeService from '../EmployeeService';
import Add from "../../../shared/components/Add";
import Search from "../../../shared/components/Search";
import Filter from "../../../shared/components/Filter";

const ViewEmployee = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(6);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

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

    return (
        <div className="flex h-[70vh] w-full mx-auto" >
            <div className="relative p-6 w-full mx-auto">
                <div className="bg-white border border-gray-100 rounded-4 shadow relative p-3 w-full h-[85vh]">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="flex-grow" style={{fontSize:"22px", fontWeight:"bold"}}>Employees</h2>
                        <div className="flex">
                            <Filter onFilterClick={() => {}} />
                            <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                            <Add onAddClick={() => {}} />
                        </div>
                    </div>
                    <div className="bg-white rounded-1 shadow relative mt-2 mx-auto overflow-hidden  h-[450px] " >
                        <DataTable
                       
                       value={paginatedEmployees}
                       paginator 
                       rows={employeesPerPage }
                       totalRecords={filteredEmployees.length}
                       lazy
                       first={firstRecordIndex}
                       onPage={(e) => setCurrentPage(e.page + 1)}
                       paginatorPosition="bottom"
                       onSort={onSort}
                       sortField={sortField}
                       sortOrder={sortOrder}
                       className="border border-gray-300"
                       
                       selectableRows
                       rowClassName="border-b border-gray-300 border border-gray-200"
                      
                        >
                            <Column field="employee_code" header="ID" sortable headerClassName="p-3" className="py-2 px-3" />
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
                                        className="p-0 me-1 ms-2 border-0 bg-transparen rounded"
                                        onClick={() => deleteEmployee(e.employee_code)}
                                    >
                                        <i className="bx bxs-trash text-blue-700"></i>
                                    </button>
                                )}
                                className="py-2 px-2"
                            />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployee;
