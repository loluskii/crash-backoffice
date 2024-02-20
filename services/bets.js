import axios from '~/plugins/axios'
export default {

    getBetHistory(filter, page){
        return axios.post('api/admin/sport/get-bet-history?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getOpenBets(filter, page){
        return axios.post('api/admin/sport/get-open-bets?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getJackpotTickets(filter, page){
        return axios.post('api/admin/sport/get-jackpot-bets?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    saveJackpotWinnings(data){
        return axios.post('api/admin/sport/save-jackpot-winnings', data).then(response =>  {
          return response.data
        }).catch(error => {
          return error.data
        });
    },

    getBets(filter, page){
        return axios.post('api/admin/sport/bets-monitor?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getLiveBets(filter, page){
        return axios.post('api/admin/sport/live-bets?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getWinnings(page){
        return axios.get('api/admin/sport/winnings-on-hold?page='+page).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getPendingCashout(page){
      return axios.get('api/admin/sport/pending-cashout?page='+page).then(response =>  {
        return response.data
      }).catch(error => {
        return error.data
      });
    },

    getUnsettledBets(page){
        return axios.get('api/admin/sport/get-unsettled-bets?page='+page).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getDeclinedBets(filter, page){
        return axios.post('api/admin/sport/get-declined-bets?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    findBet(filter){
        return axios.post('api/admin/sport/find-bet', filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getGamingActivity(filter, page){
        return axios.post('api/admin/reporting/get-gaming-activity?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getNetworkSales(filter, page){
      return axios.post('api/admin/reporting/network-sales?page='+page, filter).then(response =>  {
        return response.data
      }).catch(error => {
        return error.data
      });
    },
    getVirtualSport(filter, page){
      return axios.post('api/admin/reporting/virtual-sales?page='+page, filter).then(response =>  {
        return response.data
      }).catch(error => {
        return error.data
      });
    },
    getAgentGamingActivity(agent_id, filter, page){
        return axios.post('api/admin/agent-management/agent/'+agent_id+'/gaming-activity?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getAccountingReport(filter, page){
        return axios.post('api/admin/reporting/get-accounting-report?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getBetById(id){
        return axios.get('api/admin/sport/get-bet?betslip_id='+id).then(res =>{
            return res.data
        }).catch(err => {
            return err.data;
        })
    },
    editTicket(data){
        return axios.post('api/admin/sport/edit-ticket', data).then(response =>  {
            return response.data
        }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },

    updateTicket(id, action){
        return axios.get('api/admin/sport/ticket?id='+id+'&action='+action).then(response =>  {
            return response.data
        }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },

    updateCouponTicket(id, action){
      return axios.get('api/admin/pools/coupon/ticket?id='+id+'&action='+action).then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    },

    updateTicketItem(id, action){
        return axios.get('api/admin/sport/ticket-items?id='+id+'&action='+action).then(response =>  {
            return response.data
        }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },

    updateCouponTicketItem(id, action){
      return axios.get('api/admin/pools/coupon/ticket-items?id='+id+'&action='+action).then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    },

    updateCashoutStatus(id, action){
      return axios.get('api/admin/sport/ticket/cashout-status?id='+id+'&action='+action).then(response =>  {
        return response.data
      }).catch(error => {
        // console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    },

    delete(id){
        return axios.get('api/admin/sport/delete/'+id).then(response =>  {
            return response.data
        }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },

    getPoolTickets(filter, page, shopId){
        return axios.post(`api/admin/pools/tickets/${shopId}?page=${page}`, filter).then(response =>  {
          return response.data
        }).catch(error => {
          return error.data
        });
    },

    getPoolSales(filter, page) {
      return axios.post(`api/admin/pools/sales?page=${page}`, filter).then(res => {
        return res.data
      }).catch(err => {
        return err.data
      })
    },

    getCouponSales(filter, page) {
      return axios.post(`api/admin/pools/coupon-sales?page=${page}`, filter).then(res => {
        return res.data
      }).catch(err => {
        return err.data
      })
    },

    getCouponTickets(filter, page, shopId){
      return axios.post(`api/admin/pools/coupon-tickets/${shopId}?page=${page}`, filter).then(response =>  {
        return response.data
      }).catch(error => {
        return error.data
      });
    },
}

