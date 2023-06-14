import axios from 'axios'

const URL = 'http://localhost:5000'


// register new user
export const registerUser = async (data) => {
    try{
        const response = await axios.post(`${URL}/register`, data)
        return response.data
    }
    catch (e) {
        throw e.response.data
    }
}


// login user
export const loginUser = async (data) => {
    try {
        const response = await axios.post(`${URL}/login`, data)
        return response.data
    }
    catch (e) {
        throw e.response.data
    }
}


// getting documents to dashboard
export const getAllDocuments = async () => {
    try {
        const response = await axios.get(`${URL}/docs/dashboard`)
        return response.data
    }
    catch (e) {
        throw e.response.data
    }
}