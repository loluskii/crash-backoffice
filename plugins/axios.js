import axios from 'axios'
import LocalStorageService from '../services/localStorageService';

export default axios.create({
  baseURL: process.env.NODE_ENV !== 'production' ? process.env.devURL : process.env.prodURL,
  headers: {
    'Authorization' : `${LocalStorageService.getAccessToken()}`
  }
})
