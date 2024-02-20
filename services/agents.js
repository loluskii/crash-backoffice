import axios from '~/plugins/axios'

export default {
    getUsers(agent, page, data){
        return axios.post('/api/admin/agent-management/agent/'+agent+'/users', data).then(res => {
            return res.data
        }).catch(err => {
            return err.data
        })
    },

    getTransactions(filterData, page){
        return axios.post('/api/admin/agent-management/get-transactions?page='+page, filterData).then(response =>  {
            return response.data;
        }).catch(error => {
          toastr['error']('Somthing went wrong', 'Error');
          return response.data;
        });
    },

    transfer(data){
        return axios.post('/api/admin/agent-management/transfer', data).then(response =>  {
            return response.data;
        }).catch(error => {
        //   toastr['error']('Somthing went wrong', 'Error');
          return response.data;
        });
    },

    saveCommissions(data){
        return axios.post('/api/admin/agent-management/agent-commissions', data).then(response =>  {
            return response.data
        }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },
    getCommissions(){
        return axios.get('/api/admin/agent-management/agent-commissions').then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },
    getBetHistory(agent, filter, page){
        return axios.post('/api/admin/agent-management/agent/'+agent+'/get-bet-history?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
  getVirtualBet(agent, filter, page){
    return axios.post('/api/admin/agent-management/agent/'+agent+'/get-virtual-bets?page='+page, filter).then(response =>  {
      return response.data
    }).catch(error => {
      return error.data
    });
  },

    getOpenBets(agent, filter, page){
        return axios.post('/api/admin/agent-management/agent/'+agent+'/get-open-bets?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    calculateCommissions(page, data){
        return axios.post('/api/admin/agent-management/get-commissions?page='+page, data).then(response =>  {
            return response.data
        }).catch(error => {
          return error.data
          // toastr['error']('An error occured.', 'Error');
        });
    },
    luckyBallsCommission(page, data){
      return axios.post('/api/admin/luckyballs/commissions?page='+page, data).then(response =>  {
          return response.data
      }).catch(error => {
        return error.data
        // toastr['error']('An error occured.', 'Error');
      });
  },
    payCommission(data){
        return axios.post('/api/admin/agent-management/pay-commissions', data).then(response =>  {
            return response.data
        }).catch(error => {
          return error.data
          // toastr['error']('An error occured.', 'Error');
        });
    },
    payPowerBonus(data){
      return axios.post('/api/admin/power-bonus', data).then(response =>  {
          return response.data
      }).catch(error => {
        return error.data
        // toastr['error']('An error occured.', 'Error');
      });
  },
    updateStatus(id, action){
        return axios.get('/api/admin/agent-management/update-status?id='+id+'&action='+action).then(response =>  {
            return response.data
        }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },


}
