import axios from "~/plugins/axios";
export default {
  getGames(limit) {
    return axios
      .get(`/api/admin/casino/games?limit=${limit}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {});
  },

  getTopGames(){
    return axios.get("/api/admin/casino/games/top")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
  },

  getTopCategories(){
    return axios.get("/api/admin/casino/games/top/category")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
  },

  createTopGame(data){
    return axios.post("/api/admin/casino/games/top", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
  },

  createTopCategory(data){
    return axios.post("/api/admin/casino/games/top/category", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
  },

  deleteTopGame(id){
    return axios.delete(`/api/admin/casino/games/${id}/top`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});
  },

  getGame(id) {
    return axios
      .get("/api/admin/casino/game/" + id)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.data;
      });
  },

  saveGame(data) {
    return axios
      .post("/api/admin/casino/games", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
      });
  },

  getCategories() {
    return axios
      .get("/api/admin/casino/categories")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {});
  },

  saveCategory(data) {
    return axios
      .post("/api/admin/casino/save-category", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
      });
  },

  deleteCategory(id) {
    return axios
      .get("/api/admin/casino/category/" + id + "/delete")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {});
  },

  getGamesByCategory(id){
    return axios
      .get("/api/admin/casino/category/" + id + "/games")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {});
  }
};
