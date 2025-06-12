import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

// Get participant's enrolled challenges
export const getParticipantChallenges = createAsyncThunk(
    'participantChallenges/getParticipantChallenges',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('No token found')
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            console.log('Fetching participant challenges from API...')
            const response = await axios.get(`${API_URL}/leaderboard/participant`, config)
            console.log('API Response:', response.data)

            // Check if the response has the expected structure
            if (!response.data || typeof response.data !== 'object') {
                throw new Error('Invalid response format from server')
            }

            // If the response indicates success and has data, return the data
            if (response.data.success && Array.isArray(response.data.data)) {
                return response.data.data
            }

            // If we get here, something is wrong with the response format
            throw new Error(response.data.error || 'Invalid response format from server')
        } catch (error) {
            console.error('Error in getParticipantChallenges:', error)
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            })
            return thunkAPI.rejectWithValue(
                error.response?.data?.error || 
                error.message || 
                'Failed to fetch challenges'
            )
        }
    }
)

const initialState = {
    challenges: [],
    isLoading: false,
    error: null,
    message: ''
}

const participantChallengesSlice = createSlice({
    name: 'participantChallenges',
    initialState,
    reducers: {
        reset: (state) => {
            state.challenges = []
            state.isLoading = false
            state.error = null
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getParticipantChallenges.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getParticipantChallenges.fulfilled, (state, action) => {
                state.isLoading = false
                state.challenges = action.payload
                state.error = null
            })
            .addCase(getParticipantChallenges.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                console.error('Redux error state:', action.payload)
            })
    }
})

export const { reset } = participantChallengesSlice.actions
export default participantChallengesSlice.reducer 