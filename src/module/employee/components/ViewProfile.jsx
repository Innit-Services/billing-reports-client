import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import UpdateEmployee from "./UpdateEmployee";
import EmployeeService from "../EmployeeService";
import "boxicons/css/boxicons.min.css";
import EmployeeProfileLeft from "./EmployeeProfileLeft";
import EmployeeProfileRight from "./EmployeeProfileRight";


const ViewProfile = () => {
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeService.getAllEmployees();
        const employeeList = response.data || [];
        setEmployees(employeeList);

        const currentEmployeeIndex = employeeList.findIndex(
          (emp) => emp.employee_code === id
        );
        if (currentEmployeeIndex !== -1) {
          setEmployee(employeeList[currentEmployeeIndex]);
          setCurrentIndex(currentEmployeeIndex);
        } else {
          console.warn(`Employee with ID ${id} not found`);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [id]);

  

  const toggleForm = () => setShowForm(!showForm);
  const handleCloseForm = () => setShowForm(false);

  const updateEmployee = (updatedData) => {
    setEmployee(updatedData);
  };

  return (
    <div className="h-screen w-full mx-auto my-1">
      <div className="flex h-full my-1 overflow-scroll">
      <div className="w-[22%] mx-auto  border-white rounded-3">
        <EmployeeProfileLeft
          employee={employee}
          image={employee?.image || "https://via.placeholder.com/150"}
          toggleForm={toggleForm}
        />
        </div>
         <EmployeeProfileRight
          employee={employee}
          person_id={employee?.person_id} 
        />
      </div>

      <UpdateEmployee
        show={showForm}
        handleClose={handleCloseForm}
        employee={employee}
        updateEmployee={updateEmployee}
      />
    </div>
  );
};

export default ViewProfile;
