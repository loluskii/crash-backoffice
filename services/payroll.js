import axios from '~/plugins/axios'
export default {


    getSalaryList(filter, page, action){
        return axios.post('/api/admin/hr/payroll/salary-list?page='+page+'&action='+action, filter).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    saveSalaryList(data){
        return axios.post('/api/admin/hr/payroll/salary-list/save', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },

    makePayment(data, type){
        return axios.post('/api/admin/hr/payroll/make-payment?type='+type, data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    }

}

