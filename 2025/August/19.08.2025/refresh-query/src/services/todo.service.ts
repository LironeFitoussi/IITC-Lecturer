import api from './api';

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

export {
    getTodos
}