import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Tooltip from "@mui/material/Tooltip";

const EmployeeTable = ({
  employees,
  sortField,
  sortOrder,
  onSort,
  onRowClick,
  onDelete,
}) => {
  return (
    <DataTable
      value={employees}
      onSort={onSort}
      sortField={sortField}
      sortOrder={sortOrder}
      className="border-gray-500 text-sm"
      rowClassName="border border-gray-600 hover-row cursor-pointer"
      onRowClick={(e) => onRowClick(e.data.employee_code)}
    >
      <Column
        field="employee_code"
        header={
          <Tooltip title="Sort by id" arrow>
            <span>Id</span>
          </Tooltip>
        }
        sortable
        headerClassName="p-2 ps-4 custom-sort-header font-semibold text-base"
        className="py-2 px-4"
        style={{ width: "13%" }}
      />
      <Column
        field="first_name"
        header={
          <Tooltip title="Sort by first name" arrow>
            <span>First Name</span>
          </Tooltip>
        }
        sortable
        headerClassName="p-2 custom-sort-header font-semibold text-base"
        className="py-2 px-2 ps-3"
        style={{ width: "12%" }}
      />

      <Column
        field="last_name"
        header={
          <Tooltip title="Sort by last name" arrow>
            <span>Last Name</span>
          </Tooltip>
        }
        sortable
        headerClassName="p-2 font-semibold text-base"
        className="py-2 px-2"
        style={{ width: "12%" }}
      />

      <Column
        field="contact_number"
        header={
          <Tooltip title="Sort by contact" arrow>
            <span>Contact</span>
          </Tooltip>
        }
        sortable
        headerClassName="p-2 font-semibold text-base"
        className="py-2 px-2"
        style={{ width: "13%" }}
      />

      <Column
        field="email"
        header={
          <Tooltip title="Sort by email" arrow>
            <span>Email</span>
          </Tooltip>
        }
        sortable
        headerClassName="p-2 font-semibold text-base"
        className="py-2 px-2 pe-5"
        style={{ width: "17%" }}
      />

      <Column
        field="departmentName"
        header={
          <Tooltip title="Sort by department" arrow>
            <span>Department</span>
          </Tooltip>
        }
        sortable
        headerClassName="p-2 font-semibold text-base"
        className="py-2 px-2"
        style={{ width: "15%" }}
      />

      <Column
        field="employeeStatus.status"
        header={
          <Tooltip title="Sort by status" arrow>
            <span>Status</span>
          </Tooltip>
        }
        sortable
        headerClassName="p-2 custom-sort-header font-semibold text-base"
        className="py-2 px-2"
        style={{ width: "10%" }}
      />

      <Column
        header="Action"
        headerClassName="font-semibold text-base"
        body={(e) => (
          <Tooltip title="Delete" arrow>
            <button
              className="p-0 me-1 ms-2 border-0 bg-transparent rounded"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(e.employee_code);
              }}
            >
              <i className="bx bxs-trash fs-4 text-blue-700"></i>
            </button>
          </Tooltip>
        )}
        className="py-2 px-2"
        style={{ width: "8%" }}
      />
    </DataTable>
  );
};

export default EmployeeTable;
