import axios from "axios";

const API_URL = 'http://localhost:8080';
class EmployeeService {

   saveEmployee(employee)
   {
        return axios.post(API_URL+"/addemployee",employee);
   }
   getAllEmployees() 
   {
        return axios.get(API_URL+"/viewemployee");
   }    
   delEmployee( employee_code)
   {
        return axios.delete(API_URL+"/deleteemployee/"+ employee_code);
   }
   getAllDepartments() 
   {
        return axios.get(API_URL+"/viewdepartments");
   } 
   getAllDesignations() 
   {
        return axios.get(API_URL+"/viewpositions");
   } 
  
   getAllClients() 
   {
        return axios.get(API_URL+"/viewclient");
   } 

}
export default new EmployeeService;