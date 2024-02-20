import axios from '~/plugins/axios'
export default {

    saveTicketBonuses(data, section){
        return axios.post('/api/admin/settings/bet-bonuses?section='+section, data).then(response =>  {
            return response.data
        }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },
    getTicketBonuses(){
        return axios.get('/api/admin/settings/bet-bonuses').then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },
  getPlayerReports(page){
    return axios.get(`/api/admin/settings/bonuses/player-reports?page=${page}`).then(response =>  {
      return response.data
    }).catch(error => {
      console.log('Error', error.data.message);
      toastr['error']('An error occured.', 'Error');
    });
  },
    getBonuses(page){
      return axios.get(`/api/admin/settings/bonuses?page=${page}`).then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    },

  updateStatus(id, status){
    return axios.get(`/api/admin/settings/bonuses/${id}/update-status?status=${status}`).then(response =>  {
      return response.data
    }).catch(error => {
      console.log('Error', error.data.message);
      toastr['error']('An error occured.', 'Error');
    });
  },
    saveBonus(data){
      return axios.post(`/api/admin/settings/save-bonus`, data).then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    },
    deleteBonus(id){
      return axios.delete(`/api/admin/settings/delete-bonus/${id}`).then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    },
  getCutXBonuses(){
    return axios.get(`/api/admin/settings/cut-x-bonuses`).then(response =>  {
      return response.data
    }).catch(error => {
      console.log('Error', error.data.message);
      toastr['error']('An error occured.', 'Error');
    });
  },
  saveCutXBonus(data){
    return axios.post(`/api/admin/settings/save-cut-x-bonus`, data).then(response =>  {
      return response.data
    }).catch(error => {
      console.log('Error', error.data.message);
      toastr['error']('An error occured.', 'Error');
    });
  },
  deleteCutXBonus(id){
    return axios.delete(`/api/admin/settings/delete-cut-x-bonus/${id}`).then(response =>  {
      return response.data
    }).catch(error => {
      console.log('Error', error.data.message);
      toastr['error']('An error occured.', 'Error');
    });
  },
  givePlayerBonus(data){
    return axios.post(`/api/admin/settings/give-bonus`, data).then(response =>  {
      return response.data
    }).catch(error => {
      console.log('Error', error.data.message);
      toastr['error']('An error occured.', 'Error');
    });
  },

}

