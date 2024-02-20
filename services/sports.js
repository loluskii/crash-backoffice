import axios from '~/plugins/axios'

export default {

  updateOddsMargin(data){
    return axios.post('/api/admin/content-management/update-tournament', data).then(response =>  {
      return response.data
    }).catch(error => {
      console.log('Error', error.message);
    });
  },
  updateOdds(data){
    return axios.post('/api/feeds/update-odds-manually', data).then(response =>  {
      return response.data
    }).catch(error => {
      console.log('Error', error.message);
    });
  },
}
