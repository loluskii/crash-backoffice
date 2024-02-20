import axios from '~/plugins/axios'
export default {

    getTemplates(){
        return axios.get('/api/admin/hr/salary-templates').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    saveTemplate(data){
        return axios.post('/api/admin/hr/salary-templates', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    deleteTemplate(id){
        return axios.get('/api/admin/hr/salary-template/'+id+'/delete').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    saveType(data){
        return axios.post('/api/admin/hr/salary-template-types', data).then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
    deleteType(id){
        return axios.get('/api/admin/hr/salary-template-type/'+id+'/delete').then(response =>  {
            return response.data
        }).catch(error => {
            return error.data
        });
    },
}

