import axios from '~/plugins/axios'
export default {

    getNetCashReport(filter, page){
        return axios.post('/api/admin/reporting/get-net-cash-report?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getTaxOnReturn(filter){
        return axios.post('/api/admin/reporting/get-tax-on-return-report', filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getTaxOnTurnover(filter){
        return axios.post('/api/admin/reporting/get-tax-on-turnover-report', filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getMoneyTransactions(filter, page){
        return axios.post('/api/admin/reporting/get-money-transaction?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getSystemTransactions(filter, page){
        return axios.post('/api/admin/reporting/get-system-transaction?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getDepositWithdrawal(filter, page){
        return axios.post('/api/admin/reporting/get-deposit-withdrawal?page='+page, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getCommissions(page, data){
      return axios.post('/api/commissions/get-commissions?page='+page, data).then(response =>  {
          return response.data
      }).catch(error => {
        return error.data
        // toastr['error']('An error occured.', 'Error');
      });
    },
    getPaidCommissions(page, data){
      return axios.post('/api/commissions/paid-commissions?page='+page, data).then(response =>  {
          return response.data
      }).catch(error => {
        return error.data
        // toastr['error']('An error occured.', 'Error');
      });
    },
    getCommission(id){
      return axios.get(`/api/commissions/profile/${id}`).then(response =>  {
          return response.data
      }).catch(error => {
        return error.data
        // toastr['error']('An error occured.', 'Error');
      });
    },
    getCommissionPeriod(){
      return axios.get(`/api/commissions/periods`).then(response =>  {
          return response.data
      }).catch(error => {
        return error.data
        // toastr['error']('An error occured.', 'Error');
      });
    },
    getPowerBonus(page, data){
      return axios.get(`/api/admin/power-bonus?page=${page}&from=${data.from}&to=${data.to}`).then(response =>  {
          return response.data
      }).catch(error => {
        return error.data
        // toastr['error']('An error occured.', 'Error');
      });
    },
}

