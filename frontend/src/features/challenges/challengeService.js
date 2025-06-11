import axios from 'axios'

const API_URL = 'http://localhost:5000/api/challenges/'

// Create new challenge
const createChallenge = async (challengeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, challengeData, config)

    return response.data
}

// Get all challenges
const getChallenges = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Get single challenge
const getChallenge = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + id, config)

    return response.data
}

const challengeService = {
    createChallenge,
    getChallenges,
    getChallenge
}

export default challengeService 