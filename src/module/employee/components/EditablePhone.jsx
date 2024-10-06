import React, { useState, useEffect } from 'react';
import { FaPhone, FaEdit } from 'react-icons/fa';
import EmployeeService from '../EmployeeService';
import Tooltip from '@mui/material/Tooltip';

const EditablePhone = ({ employee }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(employee?.contact_number || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setPhone(employee?.contact_number || '');
  }, [employee]);

  const handleEditClick = () => {
    setIsEditing(true);
    setPhone(employee?.contact_number || ''); 
  };

  const handleSave = async () => {
    setError('');

    try {
      const phoneNumber = Number(phone.replace(/\D/g, ''));
      const updatedEmployee = await EmployeeService.updateContactNumber(employee?.employee_code, phoneNumber);
      console.log('Updated employee:', updatedEmployee);
      
      setPhone(phoneNumber);  
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating phone number:', err);
      setError('Failed to update phone number. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <FaPhone className="text-gray-500 mr-2" />
        <div className="flex flex-col">
          <label className="text-sm text-gray-500">Phone</label>
          {isEditing ? (
            <div className="flex items-center">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 p-1 rounded-lg w-[8vw]"
                required
              />
              <button
                onClick={handleSave}
                className="ml-2 bg-blue-400 text-white py-1 px-2 rounded-lg"
              >
                Save
              </button>
            </div>
          ) : (
            <span className="text-gray-600">{phone || 'Not available'}</span>
          )}
        </div>
      </div>
      <Tooltip title="Edit" arrow>
        <FaEdit className="text-gray-500 cursor-pointer mt-3 ms-[7vw]" onClick={handleEditClick} />
      </Tooltip>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default EditablePhone;
