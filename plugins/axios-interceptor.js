export default function ({ $axios, store, redirect }) {
    $axios.onRequest(config => {
      const token = store.state.auth.token
      if (token) config.headers.common['Authorization'] = token;
  
      // console.log('Request:')
      // console.log(config)
    })
  
    $axios.onResponse(response => {
      // console.log('Response:')
      // console.log(response)
    })
  
    $axios.onError(error => {
      // console.log('Error:')
      
      // console.log(error)
      
    })
}