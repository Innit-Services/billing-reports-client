import React, { useState, useEffect } from 'react';
import { FaEdit, FaEnvelope, FaGlobe } from 'react-icons/fa';
import EditablePhone from './EditablePhone';

const EmployeeProfileLeft = ({ employee, toggleForm }) => {
  const [image, setImage] = useState(
    localStorage.getItem("employeeImage") ||
    employee?.image ||
    "https://via.placeholder.com/150"
  );

  useEffect(() => {
    if (employee?.image) {
      localStorage.setItem("employeeImage",employee.image);
    }
  }, [employee?.image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        localStorage.setItem("employeeImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleRemoveImage = () => {
    setImage("https://via.placeholder.com/150");
    localStorage.removeItem("employeeImage");
  };

  return (
    <div className="bg-white shadow-lg py-4 px-4 mx-1 border-white rounded-3 h-screen">
      <div className="flex items-center">
        <div>
          <img
            src={image}
            alt="Employee"
            className="rounded-full cursor-pointer"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
            onClick={handleImageClick}
          />
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          {image !== "https://via.placeholder.com/150" && (
            <button
              onClick={handleRemoveImage}
              className="mt-2 bg-gray-200 px-1 rounded hover:bg-gray-300"
            >
              Remove
            </button>
          )}
        </div>
        <div className="ml-4">
          <h1 className="font-semibold text-base">
            {employee?.first_name} {employee?.last_name}
          </h1>
          <p className="text-gray-500">{employee?.designationName || "Developer"}</p>
        </div>
      </div>

      <button
        className="mt-4 mb-4 text-sm border border-blue-600 text-blue-600 px-2 py-1 rounded hover:bg-blue-500 hover:text-white flex items-center"
        onClick={toggleForm}
      >
        <FaEdit className="mr-2" /> Edit
      </button>

      <div className="w-full">
        <h2 className="font-bold">Contact</h2>
        <div className="flex items-center mt-3 justify-between">
          <div className="flex items-center">
            <FaEnvelope className="text-gray-500 mr-2" />
            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Email</label>
              <span className="text-gray-600">{employee?.email || 'Not available'}</span>
            </div>
          </div>
          <FaEdit className="text-gray-500 cursor-pointer" />
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <EditablePhone employee={employee} />
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <FaGlobe className="text-gray-500 mr-2" />
            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Address</label>
              <span className="text-gray-600">{employee?.address || 'Not available'}</span>
            </div>
          </div>
          <FaEdit className="text-gray-500 cursor-pointer mt-3" />
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileLeft;
