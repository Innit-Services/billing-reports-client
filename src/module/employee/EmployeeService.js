// src/services/EmployeeService.js
// import axiosInstance from "../../apis/axiosConfig";
// import { axiosInstance } from '../../../apis/axiosInterceptors';
import { axiosInstance } from "../../apis/axiosInterceptors";
class EmployeeService {
    // Save a new employee
    saveEmployee(employee) {
        return axiosInstance.post("/addemployee", employee);
    }

    // Fetch all employees
    getAllEmployees = async () => {
        try {
            const response =  axiosInstance.get("/viewemployee");
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching employees:", error);
            throw error; // Throw error to handle it upstream if necessary
        }
    };

    // Delete an employee by code
    delEmployee(employee_code) {
        return axiosInstance.delete(`/deleteemployee/${employee_code}`);
    }

    // Fetch all departments
    getAllDepartments() {
        return axiosInstance.get("/viewdepartments");
    }

    // Fetch all designations
    getAllDesignations() {
        return axiosInstance.get("/viewpositions");
    }

    // Fetch all clients
    getAllClients() {
        return axiosInstance.get("/viewclient");
    }
}

export default new EmployeeService(); // Export a singleton instance


// import axios from "axios";

// const API_URL = "http://localhost:8089/employee";
// class EmployeeService {
//   saveEmployee(employee) {
//     return axios.post(API_URL + "/addemployee", employee);
//   }
//   getAllEmployees = async () => {
//     try {
//       const response = await axios.get(API_URL+"/viewemployee");
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       return response;
//     }
//   };
//   delEmployee(employee_code) {
//     return axios.delete(API_URL + "/deleteemployee/" + employee_code);
//   }
//   getAllDepartments() {
//     return axios.get(API_URL + "/viewdepartments");
//   }
//   getAllDesignations() {
//     return axios.get(API_URL + "/viewpositions");
//   }

//   getAllClients() {
//     return axios.get(API_URL + "/viewclient");
//   }
// }
// export default new EmployeeService();

