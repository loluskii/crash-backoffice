import axios from '~/plugins/axios'
export default {

    store(data){
        return axios.post('/api/admin/settings/users', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getLoginHistory(data, page){
        return axios.post('/api/admin/reporting/login-history?page='+page, data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getRegistrationHistory(data, page){
        return axios.post('/api/admin/reporting/login-history?page='+page, data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    storeAdmin(data){
        return axios.post('/api/admin/settings/admin-users', data).then(response =>  {
            return response.data
        }).catch(error => {
          // console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },

    listAdmins(){
        return axios.get('/api/admin/settings/admin-users').then(response =>  {
            return response.data
        }).catch(error => {
          console.log('Error', error.data.message);
          toastr['error']('An error occured.', 'Error');
        });
    },

    deleteAdmin(user){
      return axios.get('/api/admin/settings/admin-users/delete/'+user).then(response =>  {
        return response.data
      }).catch(error => {
        console.log('Error', error.data.message);
        toastr['error']('An error occured.', 'Error');
      });
    }
}

