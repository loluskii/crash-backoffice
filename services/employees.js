import axios from '~/plugins/axios'
export default {

    createEmployee(data){
        return axios.post('/api/admin/hr/employees', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    saveEmployee(data, user){
        return axios.post('/api/admin/hr/employees/'+user+'/update', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    list(){
        return axios.get('/api/admin/hr/employees').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    deleteUser(user){
        return axios.get('/api/admin/hr/employees/'+user+'/delete').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getUser(user){
        return axios.get('/api/admin/hr/employees/'+user+'/show').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    }

}

