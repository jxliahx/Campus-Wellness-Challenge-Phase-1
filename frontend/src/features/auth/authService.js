import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

// Register participant
const registerParticipant = async (userData) => {
    console.log('Registering participant with data:', userData)
    const response = await axios.post(`${API_URL}/participants`, userData)
    console.log('Register participant response:', response.data)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Register coordinator
const registerCoordinator = async (userData) => {
    console.log('Registering coordinator with data:', userData)
    const response = await axios.post(`${API_URL}/coordinators`, userData)
    console.log('Register coordinator response:', response.data)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login participant
const loginParticipant = async (userData) => {
    console.log('Logging in participant with data:', userData)
    const response = await axios.post(`${API_URL}/participants/login`, userData)
    console.log('Login participant response:', response.data)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login coordinator
const loginCoordinator = async (userData) => {
    console.log('Logging in coordinator with data:', userData)
    const response = await axios.post(`${API_URL}/coordinators/login`, userData)
    console.log('Login coordinator response:', response.data)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Logout user
const logout = () => {
    console.log('Logging out user')
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
