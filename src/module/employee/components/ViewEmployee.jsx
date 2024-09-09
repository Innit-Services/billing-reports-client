import React from "react";
import { useState, useEffect } from "react";
import EmployeeService from '../EmployeeService';

const ViewEmployee = () => {
const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    EmployeeService.getAllEmployees()
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