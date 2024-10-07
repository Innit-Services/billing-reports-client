import axios from "axios";

const API_URL="http://localhost:8089/employee";

class PositionService{

    isAddPosition(formData){
        return axios.post(API_URL+"/addposition",formData);
      }
    getAllPositions(){
        return axios.get(API_URL+"/viewpositions")
    }
}
export default new PositionService;