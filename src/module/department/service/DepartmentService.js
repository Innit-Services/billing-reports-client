import axios from "axios";

const API_URL="http://localhost:8080";
class DepartmentService {

   saveDepartment(department)
   {
        return axios.post(API_URL+"/adddepartment",department);
   }
   getAllDepartments() 
   {
        return axios.get(API_URL+"/viewdepartments");
   } 
}
export default new DepartmentService;