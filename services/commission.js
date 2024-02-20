import axios from "~/plugins/axios";

export default {

  getProfile(){
    return axios
      .get("/api/commissions/profile")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },

  createProfile(data){
    return axios
      .post("/api/commissions/profile", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },

  updateProfile(id,data){
    return axios
      .post("/api/commissions/profile/"+id, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },

  getProfileById(id){
    return axios
      .get("/api/commissions/profile/"+id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },

  deleteProfile(id){
    return axios
      .delete("/api/commissions/profile/"+id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  }



}
