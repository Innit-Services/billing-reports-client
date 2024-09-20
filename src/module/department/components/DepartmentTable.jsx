import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const DepartmentTable = ({ departments, sortField, sortOrder, onSort, onDeleteClick, onRowClick }) => {
    return (
        <DataTable
            value={departments}
            onSort={onSort}
            sortField={sortField}
            sortOrder={sortOrder}
            className="border-gray-500"
            rowClassName="border border-gray-600 hover-row cursor-pointer"
            onRowClick={(e) => onRowClick(e.data)}
        >
            <Column field="department_id" header="ID" sortable headerClassName="p-2" className="py-2 px-3" />
            <Column field="departmentName" header="DEPARTMENT NAME" sortable headerClassName="p-2" className="py-2 px-2" />
            <Column field="description" header="DESCRIPTION" sortable headerClassName="p-2" className="py-2 px-2" />
            <Column field="createdAt" header="CREATED AT" sortable headerClassName="p-2" className="py-2 px-2" />
            <Column field="updatedAt" header="UPDATED AT" sortable headerClassName="p-2" className="py-2 px-2" />
            <Column
                header="ACTION"
                body={(department) => (
                    <button
                        className="p-0 me-1 border-0 bg-transparent hover:bg-red-200 rounded"
                        onClick={() => onDeleteClick(department)}
                    >
                        <i className="bx bxs-trash text-blue-700"></i>
                    </button>
                )}
                className="py-2 px-2"
            />
        </DataTable>
    );
};

export default DepartmentTable;
