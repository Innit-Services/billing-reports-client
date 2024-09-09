import React, { useEffect, useState } from "react";
import DepartmentService from '../service/DepartmentService';
import ConfirmModal from './ConfirmModal'; 

const ViewDepartment = () => {
    const [departmentList, setDepartmentList] = useState([]);
    const [showModal, setShowModal] = useState(false); 
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null); 
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' }); 
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        DepartmentService.getAllDepartments()
            .then((res) => {
                setDepartmentList(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDeleteClick = (id) => {
        setSelectedDepartmentId(id); 
        setShowModal(true); 
    };

    const handleConfirmDelete = () => {
        DepartmentService.deleteDepartment(selectedDepartmentId)
            .then((res) => {
                console.log("Department deleted successfully.");
                setDepartmentList(departmentList.filter(department => department.id !== selectedDepartmentId));
                setShowModal(false); 
                setSelectedDepartmentId(null); 
            })
            .catch((error) => {
                console.error("Error deleting department:", error);
                setShowModal(false); 
            });
    };

    const handleCloseModal = () => {
        setShowModal(false); 
        setSelectedDepartmentId(null);
    };

    const sortTable = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedList = [...departmentList].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setDepartmentList(sortedList);
    };

    return (
        <div className="container">
            <div className="table-container mx-auto rounded" style={{ width: "1200px", marginRight: "20vw" }}>
                <table className="table table-bordered  rounded table-hover" style={{ fontSize: "14px", borderCollapse: "collapse" }}>
                    <thead className="table-secondary">
                        <tr>
                            <th onClick={() => sortTable('id')}>
                                ID
                            </th>
                            <th onClick={() => sortTable('departmentName')}>
                                NAME <i className={`bx bx-sort ${sortConfig.key === 'departmentName' && sortConfig.direction === 'asc' ? 'bx-sort-up' : 'bx-sort-down'}`}></i>
                            </th>
                            <th onClick={() => sortTable('description')}>
                                DESCRIPTION <i className={`bx bx-sort ${sortConfig.key === 'description' && sortConfig.direction === 'asc' ? 'bx-sort-up' : 'bx-sort-down'}`}></i>
                            </th>
                            <th onClick={() => sortTable('createdAt')}>
                                CREATED AT <i className={`bx bx-sort-alt-2 ${sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? 'bx-sort-up' : 'bx-sort-down'}`}></i>
                            </th>
                            <th onClick={() => sortTable('updatedAt')}>
                                UPDATED AT <i className={`bx bx-sort ${sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' ? 'bx-sort-up' : 'bx-sort-down'}`}></i>
                            </th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departmentList.map((d, index) => (
                            <tr key={d.id}>
                                <td>{index + 1}</td>
                                <td>{d.departmentName}</td>
                                <td>{d.description}</td>
                                <td>{d.createdAt}</td>
                                <td>{d.updatedAt}</td>
                                <td>
                                    <button
                                        className="btn btn-link p-0 me-1 ms-2 border-0"
                                        onClick={() => handleDeleteClick(d.id)}
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

          
            <ConfirmModal
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this department?"
            />
        </div>
    );
};

export default ViewDepartment;
