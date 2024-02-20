import axios from '~/plugins/axios'
export default {

    saveCashOut(data){
        return axios.post('/api/admin/settings/cash-out', data).then(response =>  {
            return response.data
        }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },
    getCashOut(level){
        return axios.get('/api/admin/settings/cash-out?level='+level).then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },
    getRoles(){
        return axios.get('/api/admin/settings/user-roles').then(response =>  {
            return response.data
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
    },
    getSettings() {
      return axios.get('/api/utilities/globalvariables').then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    },
    getPaymentMethods() {
      return axios.get('/api/admin/settings/payment-methods').then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    },
    savePaymentMethods(data) {
      return axios.post('/api/admin/settings/payment-methods', data).then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    },
    updatePaymentMethod(id, data) {
      return axios.put(`/api/admin/settings/payment-methods/${id}`, data).then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    },
    getSMSGateways() {
      return axios.get('/api/admin/settings/sms-gateways').then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    },
    saveSMSGateways(data) {
      return axios.post('/api/admin/settings/sms-gateways', data).then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    },
    updateSMSGateway(id, data) {
      return axios.put(`/api/admin/settings/sms-gateway/${id}`, data).then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    }

}

