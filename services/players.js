import axios from '~/plugins/axios'
export default {

    smartSearch(data, page){
        return axios.post('/api/admin/player-management/smart-search?page='+page, data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    playersReport(filter, page){
        return axios.post('/api/admin/player-management/list-players?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getNetCashReport(filter, page){
        return axios.post('/api/admin/reporting/get-net-cash-report?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getLiabilityReport(){
        return axios.post('/api/admin/player-management/liability-report').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getPlayerData(id){
        return axios.get('/api/admin/player-management/player-data?id='+id).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getPlayerTransactions(id, page){
        return axios.get('/api/admin/player-management/player-transactions?id='+id+'&page='+page).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getPlayerGamingActivity(user_id, filter, page){
        return axios.post('/api/admin/player-management/gaming-activity?id='+user_id+'&page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getPlayerBetList(user_id, filter, page){
        return axios.post('/api/admin/player-management/player-betlist?id='+user_id+'&page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    updateWithdrawalStatus(data){
        return axios.post('/api/admin/player-management/update-request', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    updatePlayerStatus(player_id, status){
      return axios.get(`/api/admin/player-management/update-status/${player_id}?status=${status}`).then(response =>  {
        return response.data
      }).catch(error => {
        return error.data
      });
    },

    verifyAccount(player_id, status){
      return axios.get(`/api/admin/player-management/verify-account/${player_id}`).then(response =>  {
        return response.data
      }).catch(error => {
        return error.data
      });
    }

}

