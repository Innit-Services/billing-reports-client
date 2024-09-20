import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Search from "../../../shared/components/Search";
import Filter from "../../../shared/components/Filter";
import AddEmployeeStatus from "./AddEmployeeStatus";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation";
import EditEmployeeStatus from "./EditEmployeeStatus";
import Pagination from "../../../shared/components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import EmployeeService from "../EmployeeService";
import Tooltip from "@mui/material/Tooltip";
import Notification from "../../../shared/components/Notification";

const EmployeeStatus = () => {
  const { person_id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(8);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showConfirmModal, setShowDeleteConfirm] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeStatus, setEmployeeStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeService.getEmployeeStatusListById(
          person_id
        );
        setEmployeeStatus(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchData();
  }, [person_id]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onSort = (e) => {
    setSortField(e.sortField);
    setSortOrder(e.sortOrder);
  };

  const sortedEmployees = employeeStatus.sort((a, b) => {
    if (!sortField) return 0;
    const valueA = a[sortField];
    const valueB = b[sortField];
    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return sortOrder === 1 ? 1 : -1;
    if (valueB == null) return sortOrder === 1 ? -1 : 1;
    return (valueA > valueB ? 1 : -1) * sortOrder;
  });

  const filteredEmployees = sortedEmployees.filter((employee) =>
    [
      "clientId",
      "effectiveDate",
      "endDate",
      "updatedBy",
      "updatedOn",
      "status",
      "homeNonHome",
      "person_id",
    ].some((field) =>
      employee[field]?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDeleteClick = (rowData) => {
    setEmployeeToDelete(rowData);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    try {
      EmployeeService.deleteEmployeeStatus(employeeToDelete);
      console.log("hiiiiiiiiii" + employeeToDelete);
      toast.success("Employee status deleted successfully.");
      setEmployeeStatus(
        employeeStatus.filter((e) => e.person_id !== employeeToDelete)
      );
    } catch (error) {
      toast.error("Error deleting employee status.");
    }
    setShowDeleteConfirm(false);
  };

  // const handleConfirmDelete = (rowData) => {
  //   // console.log("Attempting to delete employee with code:", rowData);
  //   try {
  //     EmployeeService.deleteEmployeeStatus(rowData);
  //     console.log("hhhhh" + rowData);
  //     // .then((response) => {
  //     console.log("Delete response:", response);
  //     toast.success("Employee deleted successfully.");
  //     console.log("hhhhh" + rowData.person_id);
  //     console.log("hhhhh" + rowData);
  //     setEmployeeStatus(employeeStatus.filter((e) => e.rowData !== rowData));
  //     init();
  //     setShowDeleteConfirm(false);
  //   } catch (error) {
  //     console.error(
  //       "Error deleting employee:",
  //       error.response || error.message
  //     );
  //     toast.error("Error deleting employee.");
  //     setShowDeleteConfirm(false);
  //   }
  // };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsEditFormOpen(true);
  };

  return (
    <div className="flex h-screen w-full mx-auto">
      <Notification />
      <div className="relative p-0 w-full mx-auto">
        <div className="bg-white border border-gray-100 rounded-3 relative w-full h-[90vh] ">
          <div className="flex justify-between border border-custom-dark-blue rounded-t-lg text-white items-center bg-custom-dark-blue">
            <h2 className="flex-grow p-3 fs-5 font-bold">Employees</h2>
            <div className="flex mt-2">
              <Search
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
              <Tooltip title="Add Employee Status">
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-[3vw]"
                  onClick={() => setIsFormOpen(true)}
                >
                  <i className="bx bx-plus fs-5 text-md"></i>
                </button>
              </Tooltip>
              {isFormOpen && (
                <AddEmployeeStatus
                  onClose={() => setIsFormOpen(false)}
                  personId={person_id}
                />
              )}
              <Filter onFilterClick={() => {}} />
            </div>
          </div>

          <DataTable
            value={paginatedEmployees}
            onSort={onSort}
            sortField={sortField}
            sortOrder={sortOrder}
            className="border-gray-500 cursor-pointer"
            rowClassName="border border-gray-600 hover-row"
            onRowClick={(e) => handleEditClick(e.data)}
          >
            <Column
              field="client_name"
              header="CLIENT NAME"
              sortable
              className="py-2 px-3"
            />
            <Column
              field="status"
              header="STATUS"
              sortable
              className="py-2 px-2"
            />
            <Column
              field="effective_date"
              header="EFFECTIVE DATE"
              sortable
              className="py-2 px-2"
            />
            <Column
              field="end_date"
              header="END DATE"
              sortable
              className="py-2 px-2"
            />
            <Column
              field="updated_by"
              header="UPDATED BY"
              sortable
              className="py-2 px-2"
            />
            <Column
              field="updated_on"
              header="UPDATED ON"
              sortable
              className="py-2 px-2"
            />
            <Column
              field="home_non_home_client"
              header="HOME/NON-HOME"
              sortable
              className="py-2 px-2"
            />
            <Column
              field="person_id"
              header="PERSON_ID"
              sortable
              className="py-2 px-2"
            />
            <Column
              header="ACTION"
              body={(rowData) => (
                <button
                  className="p-0 me-1 ms-2 border-0 bg-transparent rounded"
                  onClick={() => handleDeleteClick(rowData)}
                >
                  <i className="bx bxs-trash text-blue-700"></i>
                </button>
              )}
              className="py-2 px-2"
            />
          </DataTable>

          {showConfirmModal && (
            <DeleteConfirmation
              show={showConfirmModal}
              onClose={() => setShowDeleteConfirm(false)}
              onConfirm={() => handleConfirmDelete(employeeToDelete)}
            />
            //   <DeleteConfirmation
            //   show={showDeleteConfirm}
            //   onClose={handleDeleteCancel}
            //   onConfirm={() => handleDeleteConfirm(employeeToDelete)} // Passing the correct employee code
            // />
          )}

          {isEditFormOpen && (
            <EditEmployeeStatus
              employeeData={selectedEmployee}
              onClose={() => setIsEditFormOpen(false)}
            />
          )}

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

export default EmployeeStatus;