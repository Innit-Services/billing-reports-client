import React from "react";
import EmployeeSubmenu from "./EmployeeSubmenu";
import ProfileHeader from "./ProfileHeader";

const EmployeeProfileRight = ({ employee, handleEdit,
  employees,
  currentIndex,
  onPrev,
  onNext,
  onSelectEmployee,
  employeeDropdownOpen,
  setEmployeeDropdownOpen,
  employeeDropdownRef, }) => {
  return (
    <div className="w-[78%] bg-white rounded-3">
      <ProfileHeader
        employee={employee}
        employees={employees}
        currentIndex={currentIndex}
        onPrev={onPrev}
        onNext={onNext}
        onSelectEmployee={onSelectEmployee}
        employeeDropdownOpen={employeeDropdownOpen}
        setEmployeeDropdownOpen={setEmployeeDropdownOpen}
        employeeDropdownRef={employeeDropdownRef}
      />
      <EmployeeSubmenu person_id={employee?.employeeStatus?.person_id} id={employee?.employee_code} />
      <div className="shadow-sm w-full mt-4">
        <h1 className="text-lg bg-gray-100 p-1 flex justify-between">
          <span className="ps-2 font-semibold text-base">Basic Details</span>
          <i
            className="bx bx-edit text-blue-600 cursor-pointer"
            onClick={() => handleEdit("basicDetails")}
          ></i>
        </h1>
        <table className="table-auto mx-2 text-sm w-full">
          <tbody>
            <tr className="border-0">
              <th className="border-0 font-medium p-2">Employee Id</th>
              <td className="border-0 d-flex justify-content-between align-items-center p-2">
                <span>{employee?.employee_code}</span>
              </td>
            </tr>
            <tr className="border-0">
              <th className="border-0 font-medium p-2">Full Name</th>
              <td className="border-0 d-flex justify-content-between align-items-center p-2">
                <span>
                  {employee?.first_name} {employee?.middle_name} {}
                  {employee?.last_name}
                </span>
              </td>
            </tr>
            <tr className="border-0">
              <th className="border-0 font-medium p-2">Date of Birth</th>
              <td className="border-0 d-flex justify-content-between align-items-center p-2">
                <span>{employee?.date_of_birth}</span>
              </td>
            </tr>
            <tr className="border-0">
              <th className="border-0 font-semibold p-2">Gender</th>
              <td className="border-0 d-flex justify-content-between align-items-center p-2">
                <span>{employee?.gender}</span>
              </td>
            </tr>
            <tr className="border-0">
              <th className="border-0 font-medium p-2">Marital Status</th>
              <td className="border-0 d-flex justify-content-between align-items-center p-2">
                <span>{employee?.marital_status}</span>
              </td>
            </tr>
            <tr className="border-0">
              <th className="border-0 font-medium p-2">Emergency Contact</th>
              <td className="border-0 d-flex justify-content-between align-items-center p-2">
                <span>{employee?.employee_emergency_contact}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="shadow-sm mb-1 text-sm">
        <h1 className="font-medium ps-3 bg-gray-100 p-1 text-base">
          Other Details
        </h1>
        <table className="table-auto w-full">
          <tbody>
            <tr className="border-0">
              <th className="border-0 font-semibold ps-3 p-2">Job Status</th>
              <td className="border-0 d-flex justify-content-between align-items-center p-2">
                <span>{employee?.employeeStatus?.status}</span>
              </td>
            </tr>
            <tr className="border-0">
              <th className="border-0 font-semibold ps-3 p-2">Department</th>
              <td className="border-0 d-flex justify-content-between align-items-center p-2">
                <span>{employee?.departmentName}</span>
              </td>
            </tr>
            <tr className="border-0">
              <th className="border-0 font-semibold ps-3 p-2">
                Designation Name
              </th>
              <td className="border-0 d-flex justify-content-between align-items-center p-2">
                <span>{employee?.designationName}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeProfileRight;
