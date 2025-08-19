import api from './api';
import { type todoDTO } from '../types';

async function getTodos () {
    try {
        const { data } = await api.get('/todos')
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function postTodo (payload: todoDTO) {
    try {
        const { data } = await api.post('/todos', payload) 
        return data
    } catch (error) {
        console.error(error);
        return error;
    }
}

export {
    getTodos,
    postTodo
}