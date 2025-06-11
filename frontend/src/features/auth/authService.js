import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

// Register participant
const registerParticipant = async (userData) => {
    const response = await axios.post(`${API_URL}/participants`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Register coordinator
const registerCoordinator = async (userData) => {
    const response = await axios.post(`${API_URL}/coordinators`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login participant
const loginParticipant = async (userData) => {
    const response = await axios.post(`${API_URL}/participants/login`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login coordinator
const loginCoordinator = async (userData) => {
    const response = await axios.post(`${API_URL}/coordinators/login`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    registerParticipant,
    registerCoordinator,
    loginParticipant,
    loginCoordinator,
    logout,
}

export default authService
