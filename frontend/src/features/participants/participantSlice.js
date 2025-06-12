import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Get all participants
export const getParticipants = createAsyncThunk(
    'participants/getAll',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            console.log('Token for participant request:', token)
            
            if (!token) {
                throw new Error('No authentication token found')
            }
            
            const response = await fetch('http://localhost:5000/api/participants', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            
            const data = await response.json()
            console.log('Participant response:', data)
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch participants')
            }
            return data
        } catch (error) {
            console.error('Error in getParticipants:', error)
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const initialState = {
    participants: [],
    isLoading: false,
    isError: false,
    message: ''
}

export const participantSlice = createSlice({
    name: 'participants',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getParticipants.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getParticipants.fulfilled, (state, action) => {
                state.isLoading = false
                state.participants = action.payload
            })
            .addCase(getParticipants.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = participantSlice.actions
export default participantSlice.reducer 