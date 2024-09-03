import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EmployeeService from "../EmployeeService";
import Search from "./Search";
import Add from "./Add";
import Filter from "./Filter";
import EditEmployee from "./EditEmployee"; // Import your EditEmployee component

const ListTemplate = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(8);
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
      employee.departmentName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      employee.contact_number.includes(searchQuery) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeStatus.status
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  const firstRecordIndex = (currentPage - 1) * employeesPerPage;
  const paginatedEmployees = filteredEmployees.slice(
    firstRecordIndex,
    firstRecordIndex + employeesPerPage
  );

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="flex mx-auto min-h-[70vh] min-w-[70vw] relative w-full">
      <div className="mx-auto mt-1">
        <div className="bg-light border border-gray-200 rounded-lg shadow relative p-2">
          <div className="flex justify-between items-center space-x-1">
            <div className="flex-grow" style={{ display: "flex" }}>
              <h4>Employees</h4>
              <Filter onFilterClick={() => {}} />
              <Search
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
              <Add onAddClick={() => {}} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow relative mt-2">
            <DataTable
              value={paginatedEmployees}
              paginator
              rows={employeesPerPage}
              totalRecords={filteredEmployees.length}
              lazy
              first={firstRecordIndex}
              onPage={(e) => setCurrentPage(e.page + 1)}
              onSort={onSort}
              sortField={sortField}
              sortOrder={sortOrder}
              className="border border-gray-300"
              rowClassName="border-b border-gray-300 border border-gray-200"
            >
              <Column
                field="employee_code"
                header="ID"
                sortable
                headerClassName="p-3"
                className="py-2 px-2"
              />
              <Column
                field="first_name"
                header="FIRST NAME"
                sortable
                headerClassName="p-2"
                className="py-2 px-2"
              />
              <Column
                field="last_name"
                header="LAST NAME"
                sortable
                headerClassName="p-2"
                className="py-2 px-2"
              />
              <Column
                field="contact_number"
                header="CONTACT"
                sortable
                headerClassName="p-2"
                className="py-2 px-2"
              />
              <Column
                field="email"
                header="EMAIL ID"
                sortable
                headerClassName="p-2"
                className="py-2 px-2"
              />
              <Column
                field="departmentName"
                header="DEPARTMENT"
                sortable
                headerClassName="p-2"
                className="py-2 px-2"
              />
              <Column
                field="employeeStatus.status"
                header="STATUS"
                sortable
                headerClassName="p-2"
                className="py-2 px-2"
              />
              <Column
                header="ACTION"
                body={(e) => (
                  <div className="flex items-center space-x-2 w-full">
                    {/* <button
                      className="p-0 me-1 border-0 bg-transparent hover:bg-blue-200 rounded"
                      onClick={() => handleEditClick(e)}
                    >
                      <i
                        className="bx bx-edit text-green-500"
                        style={{ fontSize: "16px", color: "green" }}
                      ></i>
                    </button> */}
                    <button
                      className="p-0 me-1 border-0 bg-transparent hover:bg-red-200 rounded"
                      onClick={() => deleteEmployee(e.employee_code)}
                    >
                      <i
                        className="bx bx-trash text-red-500"
                        style={{ fontSize: "16px", color: "red" }}
                      ></i>
                    </button>
                  </div>
                )}
                className="py-2 px-4"
              />
            </DataTable>
          </div>
        </div>
      </div>
      {showModal && selectedEmployee && (
        <EditEmployee employee={selectedEmployee} onClose={closeModal} />
      )}
    </div>
  );
};

export default ListTemplate;
