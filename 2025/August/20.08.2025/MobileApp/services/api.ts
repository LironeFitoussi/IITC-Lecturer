import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios' 

const api = axios.create({
    baseURL: 'http://172.16.4.6:3001/api'
})

api.interceptors.request.use(async (config: any) =>{
    const token = await AsyncStorage.getItem('authToken')
    if (token && config.headers) {
        config.header.Authorization = `Bearer ${token}`
    }
    return config
})