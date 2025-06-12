import axios from 'axios'

const API_URL = 'http://localhost:5000/api/resources/'

// Upload resource
const uploadResource = async (resourceData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }

    const response = await axios.post(API_URL, resourceData, config)
    return response.data
}

// Get challenge resources
const getChallengeResources = async (challengeId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + challengeId, config)
    return response.data
}

// Delete resource
const deleteResource = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const resourceService = {
    uploadResource,
    getChallengeResources,
    deleteResource
}

export default resourceService 