import axios from 'axios' 

const api = axios.create({
    baseURL: 'http://172.16.4.6:3001/api'
})