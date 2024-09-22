import axios from "axios";

const API_URL = "http://localhost:8082";
class EmployeeService {
  saveEmployee(employee) {
    return axios.post(API_URL + "/employees/addemployee", employee);
  }
  getAllEmployees = async () => {
    try {
      const response = await axios.get(API_URL + "/employees");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      return response;
    }
  };

  delEmployee(employee_code) {
    return axios.delete(API_URL + "/employees/" + employee_code);
  }
  getAllDepartments() {
    return axios.get(API_URL + "/viewdepartments");
  }
  getAllDesignations() {
    return axios.get(API_URL + "/viewpositions");
  }
  getAllClients() {
    return axios.get(API_URL + "/viewclient");
  }

  AddNewEmployeeStatus = async (employeestatus) => {
    try {
      const response = await axios.post(
        `${API_URL}/employees/addemployeestatus`,
        employeestatus
      );
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error saving employee status:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  // AddNewEmployeeStatus(status) {
  //   return axios.post(`${API_URL}/employees/addemployeestatus}`, status);
  // }

  getEmployeeStatusListById = async (id) => {
    try {
      const response = await axios.get(
        API_URL + "/employees/viewemployeestatus/" + id
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      return response;
    }
  };

  deleteEmployeeStatus(formData) {
    return axios({
      method: "delete",
      url: API_URL + "/employees/deleteempstatus/" + formData.person_id,
      data: formData,
    });
  }

  updateEmployeeStatus = async (formData) => {
    try {
      const response = await axios.put(
        `${API_URL}/employees/updateempstatus`, // No person_id in URL
        formData // Send formData in the body
      );
      return response.data;
    } catch (error) {
      console.error("Error updating employee status:", error);
      throw error;
    }
  };
  filterEmployee(formData) {
    return axios.post(API_URL + "/employees/filter", formData);
  }
}
export default new EmployeeService();
