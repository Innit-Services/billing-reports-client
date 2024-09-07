import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { selectEmployeeById } from "../employeeSlice";


const EmployeeSummary = () => {
  const { employeeId } = useParams();
  console.log(employeeId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  /** need to replace this with selector */
  const {employees} = useSelector((state) => state.employees);

  const employee = employees.find((employee) => employee.id === employeeId);
  console.log(employee);

  return (
    <>
      {employeeId}
      {JSON.stringify(employee)}
    </>
  );
};
export default EmployeeSummary;
