<<<<<<< Updated upstream
import React from "react";
import { useState, useEffect } from "react";
import EmployeeService from '../EmployeeService';

const ViewEmployee = () => {
const [employeeList, setEmployeeList] = useState([]);
=======
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EmployeeService from "../EmployeeService";
import { useNavigate } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import Search from "../../../shared/components/Search";
import Filter from "../../../shared/components/Filter";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../../shared/components/Pagination";
import Tooltip from "@mui/material/Tooltip";
import Notification from "../../../shared/components/Notification";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation";
import FilterForm from "./FilterForm";  // Import the filter form

const ViewEmployee = () => {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(9);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterFormOpen, setIsFilterFormOpen] = useState(false); // Manage filter form state
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const handleDetailClick = (id) => {
    navigate(`/viewprofile/${id}`);
  };
>>>>>>> Stashed changes

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    EmployeeService.getAllEmployees()
<<<<<<< Updated upstream
      .then((res) => {
        console.log(res.data);
        setEmployeeList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const deleteEmployee = (employee_code) => {
    EmployeeService.delEmployee(employee_code)
      .then((res) => {

        init();
      })
      .catch((error) => {

        console.log(error);
      });
  }


  return (
    <div className="container">
      <div className="table-container mx-auto rounded" style={{ width: "1190px" }}>
        <table className="table table-bordered table-hover" style={{ fontSize: "14px", borderCollapse: "collapse" }}>
          <thead className="table-secondary">
            <tr>
            <th >ID</th>
            <th>FIRST NAME </th>
            <th> LAST NAME </th>
            <th>CONTACT</th>
            <th>EMAIL</th>
            <th>HIRE DATE</th>
            <th>DEPARTMENT</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((e) => (
            <tr key={e.employee_code}>
              <td>{e.employee_code}</td>
              <td>{e.first_name}</td>
              <td>{e.last_name}</td>
              <td>{e.contact_number}</td>
              <td>{e.email}</td>
              <td>{e.joining_date}</td>
              <td>{e.departmentName}</td>
              <td>{e.employeeStatus.status}</td>
              <td>
                <button
                  className="btn btn-link p-0 me-1 ms-2 border-0"
                  onClick={() => deleteEmployee(e.employee_code)}
                  style={{ fontSize: "14px", background: "transparent" }}
                >
                  <i className='bx bx-trash border-0'></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div >
  );
}
export default ViewEmployee;
=======
      .then((response) => {
        setEmployeeList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  };

  const handleDeleteClick = (employee_code) => {
    setEmployeeToDelete(employee_code);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = (employee_code) => {
    EmployeeService.delEmployee(employee_code)
      .then((response) => {
        toast.success("Employee deleted successfully.");
        init();
        setShowDeleteConfirm(false); // Close the confirmation popup after success
      })
      .catch((error) => {
        toast.error("Error deleting employee.");
        setShowDeleteConfirm(false); // Close the popup even if there's an error
      });
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false); // Close the confirmation popup when cancelled
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

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex h-screen w-full mx-auto">
      <Notification />
      <div className="relative p-0 w-full mx-auto">
        <div className="bg-white border border-gray-100 rounded-3 relative w-full h-[90vh] ">
          <div className="flex justify-between border border-custom-dark-blue rounded-t-lg  text-white items-center  bg-custom-dark-blue">
            <h2 className="flex-grow p-3 fs-5 font-bold ">Employees</h2>
            <div className="flex mt-2">
              <Search
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
              <Tooltip title="Add Employee">
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-[3vw]"
                  onClick={openForm}
                >
                  <i className="bx bx-plus fs-5 text-md"></i>
                </button>
              </Tooltip>
              {isFormOpen && <AddEmployee onClose={closeForm} />}
              <Tooltip title="Filter Employees">
                <button
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-[3vw]"
                  onClick={() => setIsFilterFormOpen(true)} // Open the filter form
                >
                  <i className="bx bx-filter fs-5 text-md"></i>
                </button>
              </Tooltip>
            </div>
          </div>

          <DataTable
            value={paginatedEmployees}
            onSort={onSort}
            sortField={sortField}
            sortOrder={sortOrder}
            className="border-gray-500"
            rowClassName="border border-gray-600 hover-row cursor-pointer"
          >
            <Column
              field="employee_code"
              header={
                <Tooltip title="Sort by Id" arrow>
                  <span>ID</span>
                </Tooltip>
              }
              sortable
              headerClassName="p-2 ps-3 custom-sort-header"
              className="py-2 px-3"
              body={(e) => (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDetailClick(e.employee_code)}
                >
                  {e.employee_code}
                </span>
              )}
            />
            <Column
              field="first_name"
              header={
                <Tooltip title="Sort by Name" arrow>
                  <span>FIRST NAME</span>
                </Tooltip>
              }
              sortable
              headerClassName="p-2 custom-sort-header"
              className="py-2 px-2"
            />
            <Column
              field="last_name"
              header={
                <Tooltip title="Sort by LastName" arrow>
                  <span>LAST NAME</span>
                </Tooltip>
              }
              sortable
              headerClassName="p-2"
              className="py-2 px-2"
            />
            <Column
              field="contact_number"
              header={
                <Tooltip title="Sort by Contact" arrow>
                  <span>CONTACT</span>
                </Tooltip>
              }
              sortable
              headerClassName="p-2"
              className="py-2 px-2"
            />
            <Column
              field="email"
              header={
                <Tooltip title="Sort by Email" arrow>
                  <span>EMAIL</span>
                </Tooltip>
              }
              sortable
              headerClassName="p-2"
              className="py-2 px-2"
            />
            <Column
              field="employeeStatus.status"
              header={
                <Tooltip title="Sort by Status" arrow>
                  <span>STATUS</span>
                </Tooltip>
              }
              sortable
              headerClassName="p-2"
              className="py-2 px-2"
            />
            <Column
              field="departmentName"
              header={
                <Tooltip title="Sort by Department" arrow>
                  <span>DEPARTMENT</span>
                </Tooltip>
              }
              sortable
              headerClassName="p-2"
              className="py-2 px-2"
            />
            <Column
              field="joining_date"
              header={
                <Tooltip title="Sort by Joining Date" arrow>
                  <span>JOINING DATE</span>
                </Tooltip>
              }
              sortable
              headerClassName="p-2"
              className="py-2 px-2"
            />
            <Column
              body={(rowData) => (
                <button
                  className="px-2 py-1 border-none bg-red-600 text-white rounded cursor-pointer"
                  onClick={() => handleDeleteClick(rowData.employee_code)}
                >
                  Delete
                </button>
              )}
              header="Action"
              headerClassName="p-2"
              className="py-2 px-2"
            />
          </DataTable>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        </div>
      </div>

      {/* Display the filter form when isFilterFormOpen is true */}
      {isFilterFormOpen && (
        <FilterForm onClose={() => setIsFilterFormOpen(false)} />
      )}

      {/* Delete confirmation popup */}
      {showDeleteConfirm && (
        <DeleteConfirmation
          employeeCode={employeeToDelete}
          onDeleteConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default ViewEmployee;
>>>>>>> Stashed changes
