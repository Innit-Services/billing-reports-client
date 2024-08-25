import axios from "axios";

const API_URL="http://localhost:8080";
class ClientService {

   saveClient(client)
   {
        return axios.post(API_URL+"/addclient",client);
   }
   getAllClients() 
   {
        return axios.get(API_URL+"/viewclient");
   } 
   delClient(client_id)
   {
        return axios.delete(API_URL+"/deleteclient/"+client_id);
   }
}
export default new ClientService;