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


// login existing user
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
export const getAllDocuments = async (token) => {
    try {
        const response = await axios.get(`${URL}/docs/dashboard`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    }
    catch (e) {
        throw e.response.data
    }
}


// deleting document
export const deleteDocument = async (id, token) => {
    try {
        const response = await axios.delete(`${URL}/docs/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    }
    catch (e) {
        throw e.response.data
    }
}