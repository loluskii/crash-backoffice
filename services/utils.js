import axios from '~/plugins/axios'
export default {
    /**
     * PAYMENT METHODS
    **/
    savePaymentMethod(data){
        return axios.post('/api/admin/hr/utilities/payment-methods', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getPaymentMethods(){
        return axios.get('/api/admin/hr/utilities/payment-methods').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    deletePaymentMethod(id){
        return axios.get('/api/admin/hr/utilities/payment-method/'+id+'/delete').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    /**
     * BANK AND CASH
    **/
    saveBankCash(data){
        return axios.post('/api/admin/hr/utilities/bank-cash', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getBankCash(){
        return axios.get('/api/admin/hr/utilities/bank-cash').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    deleteBankCash(id){
        return axios.get('/api/admin/hr/utilities/bank-cash/'+id+'/delete').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    /**
     * LOCATIONS
    **/
    saveLocations(data){
        return axios.post('/api/admin/hr/utilities/locations', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    getLocations(){
        return axios.get('/api/admin/hr/utilities/locations').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    deleteLocation(id){
        return axios.get('/api/admin/hr/utilities/location/'+id+'/delete').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    /**
     * DEPARTMENTS
    **/
    getDepartments(){
        return axios.get('/api/admin/hr/departments').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    saveDepartment(data){
        return axios.post('/api/admin/hr/departments', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    editDepartment(data){
        return axios.post('/api/admin/hr/department/edit', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    deleteItem(id, type){
        return axios.get('/api/admin/hr/'+type+'/'+id+'/delete').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    getFormData(){
        return axios.get('/api/admin/hr/utilities/get-formdata').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
}

