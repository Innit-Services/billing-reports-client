import { axiosInstance } from '../../../apis/axiosInterceptors';
 // Import your configured Axios instance
//  import axiosInstance from "../../../apis/axiosConfig";

// import { axiosInstance } from '../../../apis/axiosInterceptors'; 

// class DepartmentService {
//    function 
//             getAllDepartments() {
//         console.log('Getting all departments');
//         return axiosInstance.get(`/viewdepartments`)
//             .then(response => {
//                console.log("response",response)
//                 console.log('Get all departments response:', response);
//                 return response;
//             })
//             .catch(error => {
//                 console.error('Error getting departments:', error);
//                 throw error;
//             });
//    } 

// }

// export default new DepartmentService();

export default async function getAllDepartments() {
     try {
         console.log('Getting all departments');
         const response = await axiosInstance.get("/viewdepartments");  
         console.log("response", response);
         console.log('Get all departments response:', response);
         return response;  
     } catch (error) {
         console.error('Error getting departments:', error);
         throw error;  
     }
 }
 


