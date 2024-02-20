import axios from "~/plugins/axios";

export default {
  getLiability(data){
    return axios.post('/api/sports/bets/liability', data).then(response =>  {
        return response.data
    }).catch(error => {
      console.log('Error', error.data.message);
      toastr['error']('An error occured.', 'Error');
    });
  },
  getProfitability(data){
    return axios.post('/api/sports/bets/profitability', data).then(response =>  {
        return response.data
    }).catch(error => {
      console.log('Error', error.data.message);
      toastr['error']('An error occured.', 'Error');
    });
  },
  disableEventMarket(data){
    return axios.post('/api/admin/content-management/fixture/markets/disable', data).then(response =>  {
        return response.data
    }).catch(error => {
        console.log('Error', error.message);
    });
  },
}
