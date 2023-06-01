import axios from 'axios'

const URL = 'http://localhost:5000'

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