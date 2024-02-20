import axios from '~/plugins/axios'
export default {
    saveApplication(data){
        return axios.post('/api/admin/hr/leave-management', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getApplications(page){
        return axios.get('/api/admin/hr/leave-management?page'+page).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    updateStatus(data){
        return axios.post('/api/admin/hr/leave-management/update-status', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    deleteApplication(id){
        return axios.get('/api/admin/hr/leave-management/'+id+'/delete').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    saveCategory(data){
        return axios.post('/api/admin/hr/leave-management/categories', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getCategories(){
        return axios.get('/api/admin/hr/leave-management/categories').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    deleteCategory(id){
        return axios.get('/api/admin/hr/leave-management/category/'+id+'/delete').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

}

