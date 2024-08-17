import employees from "./data";

function fetchEmployee(){
   return employees;
}

const EmployeeService = {
    fetchEmployee
}

export default EmployeeService;