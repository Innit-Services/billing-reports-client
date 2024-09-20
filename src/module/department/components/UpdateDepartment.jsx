import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import DepartmentService from '../../department/service/DepartmentService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateDepartment = ({ department, onClose, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        department_id: "",
        departmentName: "",
        description: "",
        createdAt: "",
        updatedAt: "",
    });

    useEffect(() => {
        if (department) {
            setFormData(department);
        }
    }, [department]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        DepartmentService.isUpdateDepartment(formData.department_id, formData)
            .then((response) => {
                console.log("Department updated:", response.data);
                if (onUpdateSuccess) {
                    onUpdateSuccess(response.data); // Notify parent about the update success
                }
                
                onClose(); // Close the form/modal after a successful update
             
            })
            .catch((error) => {
                console.error("Error updating department:", error);
              
            });
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40" onClick={onClose}></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-col h-[95vh] w-full max-w-lg">
                    <div className="flex p-2 justify-between items-center border-b-2 text-black">
                        <h2 className="text-xl font-semibold">Update Department</h2>
                        <FontAwesomeIcon icon={faTimes} size="lg" onClick={onClose} className="cursor-pointer" />
                    </div>
                    <div className="flex-grow overflow-y-auto p-3">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label htmlFor="departmentName" className="block text-base font-medium text-gray-700 mb-1">Department Name</label>
                                <input
                                    type="text"
                                    name="departmentName"
                                    id="departmentName"
                                    value={formData.departmentName}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="description" className="block text-base font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-1 text-base font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>
                            </form>
                            </div>
                           
                            <div className="flex justify-end p-2 border-t-2">
                                <button
                                    type="button"
                                    className="text-white px-3 py-1 rounded bg-red-500 mr-4"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="text-white px-3 py-1 rounded bg-blue-500"
                                    onClick={handleSubmit}
                                >
                                    Update
                                </button>
                           
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateDepartment;
