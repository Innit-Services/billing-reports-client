import axios from "axios";

const API_URL = "http://localhost:8089";

class EmployeeService {
  saveEmployee(employee) {
    return axios
      .post(`${API_URL}/employee`, employee)
      .then((response) => {
        console.log('Employee added:', response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error adding employee:', error.response ? error.response.data : error.message);
        throw error;
      });
  };
  
  getAllEmployees = async () => {
    try {
      const response = await axios.get(API_URL + "/employee");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching employee:", error);
      return response;
    }
  };
  delEmployee = async (employee_code) => {
    try {
      const response = await axios.delete(API_URL + "/employee/" + employee_code);
      console.log("Employee deleted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting employee:", error);
      return error.response;
    }
  };
  
  updateemployee(departmentName,positionName,formData){
   
    return axios.put(`${API_URL}/employees/updateemployee/${departmentName}/${positionName}`,formData)
  }

  async updateEmployeeAddress(employeeCode, address) {
    try {
      const response = await axios.put(
        `${API_URL}/employee/updateaddress/${employeeCode}`,
        { address }, 
        {
          headers: {
            'Content-Type': 'application/json' 
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  }
  
  getEmployeeStatusListById = async (id) => {
    try {
      const response = await axios.get(
        API_URL + "/employee/viewemployeestatus/" + id
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      return response;
    }
  };
 
  updateEmployeeStatus = async (formData) => {
    try {
      const response = await axios.put(
        `${API_URL}/employee/updateempstatus`, 
        formData 
      );
      return response.data;
    } catch (error) {
      console.error("Error updating employee status:", error);
      throw error;
    }
  };


}
export default new EmployeeService();