import axios from "axios";

const API_URL="http://localhost:8082/employees";
class DepartmentService {

  getAllDepartments() 
   {
        return axios.get(API_URL+"/viewdepartments");
   } 
   isAddDepartment(formData){
     return axios.post(API_URL+"/adddepartment",formData);
   }
  
   isUpdateDepartment(department_code,formData){
     return axios.put(`${API_URL}/upadatedepartment/${department_code}`,formData);
   }
   deleteDepartmentByName(departmentName){
    return axios.delete(API_URL + "/deletedepartment/" + departmentName);
   }
}
export default new DepartmentService;