import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Search from "../../../shared/components/Search";
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

const ViewEmployeeStatus = () => {
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
  const [employeeStatuse, setEmployeeStatuse] = useState([]);

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
    ["client_name", "effective_date", "end_date", "status"].some((field) =>
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

  const handleConfirmDelete = async () => {
    try {
      await EmployeeService.deleteEmployeeStatus(employeeToDelete); // Call the delete API
      toast.success("Employee status deleted successfully.");

      // Re-fetch the employee status list from the server
      const response = await EmployeeService.getEmployeeStatusListById(
        person_id
      );
      setEmployeeStatus(response.data); // Set the new list after deletion
    } catch (error) {
      console.error("Error deleting employee status:", error);
      toast.error("Error deleting employee status.");
    }
    setShowDeleteConfirm(false); // Close the confirmation dialog
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsEditFormOpen(true);
  };

  const refreshEmployeeData = async () => {
    try {
      const response = await EmployeeService.getEmployeeStatusListById(
        person_id
      );
      console.log(response.data); // Ensure correct data is fetched
      setEmployeeStatus(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleUpdateSuccess = () => {
    refreshEmployeeData();
  };
  const handleAddSuccess = (newEmployeeStatus) => {
    setEmployeeStatus((prevStatuses) => [...prevStatuses, newEmployeeStatus]);
  };
  return (
    <div className="flex h-screen w-full mx-auto">
      <Notification />
      <div className="relative p-0 w-full mx-auto">
        <div className="bg-white border border-gray-100 rounded-3 relative w-full h-[90vh] ">
          <div className="flex justify-between border border-custom-dark-blue rounded-t-lg text-white items-center bg-custom-dark-blue">
            <h2 className="flex-grow p-3 fs-5 font-bold title">
              Employees Status
            </h2>
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
                  onAddSuccess={handleAddSuccess}
                />
              )}
              {/* <Filter onFilterClick={() => {}} /> */}
            </div>
          </div>

          <DataTable
            data={employeeStatuse}
            key={employeeStatus.length} // Adding key to force re-render when length changes
            value={paginatedEmployees}
            onSort={onSort}
            sortField={sortField}
            sortOrder={sortOrder}
            className="border-gray-500 cursor-pointer thead"
            rowClassName="border border-gray-600 hover-row"
            onRowClick={(e) => handleEditClick(e.data)}
          >
            <Column
              field="client_name"
              header={
                <Tooltip title="Sort by Name" arrow>
                  <span>Client Name</span>
                </Tooltip>
              }
              sortable
              className="py-2 ps-3 fieldData"
              headerClassName="py-2 ps-3"
            />
            <Column
              field="status"
              header={
                <Tooltip title="Sort by Status" arrow>
                  <span>Status </span>
                </Tooltip>
              }
              sortable
              className="py-2 px-3 fieldData"
              headerClassName="px-3"
            />
            <Column
              field="effective_date"
              header={
                <Tooltip title="Sort by Date" arrow>
                  <span>Effective Date</span>
                </Tooltip>
              }
              sortable
              className="py-2 fieldData"
            />
            <Column
              field="end_date"
              header={
                <Tooltip title="Sort by Date" arrow>
                  <span>End Date</span>
                </Tooltip>
              }
              sortable
              className="py-2 fieldData"
            />

            <Column
              header="Action"
              body={(rowData) => (
                <button
                  className="me-1 ms-2 border-0 bg-transparent rounded"
                  onClick={() => handleDeleteClick(rowData)}
                >
                  <Tooltip title="Delete Data">
                    <i className="bx bxs-trash text-blue-700 text-18px"></i>
                  </Tooltip>
                </button>
              )}
              className="py-2 "
            />
          </DataTable>

          {showConfirmModal && (
            <DeleteConfirmation
              show={showConfirmModal}
              onClose={() => setShowDeleteConfirm(false)}
              onConfirm={handleConfirmDelete}
            />
          )}

          {isEditFormOpen && (
            <EditEmployeeStatus
              employeeData={selectedEmployee} // Pass the selected employee data to the edit form
              onClose={() => setIsEditFormOpen(false)}
              onUpdateSuccess={handleUpdateSuccess} // Callback to refresh the data
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

export default ViewEmployeeStatus;
