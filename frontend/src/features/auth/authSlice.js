import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

// Register participant
export const registerParticipant = createAsyncThunk('auth/registerParticipant', async (user, thunkAPI) => {
    try {
        return await authService.registerParticipant(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Register coordinator
export const registerCoordinator = createAsyncThunk('auth/registerCoordinator', async (user, thunkAPI) => {
    try {
        return await authService.registerCoordinator(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login participant
export const loginParticipant = createAsyncThunk('auth/loginParticipant', async (user, thunkAPI) => {
    try {
        console.log('Login participant attempt with:', user)
        const response = await authService.loginParticipant(user)
        console.log('Login participant response:', response)
        return response
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login coordinator
export const loginCoordinator = createAsyncThunk('auth/loginCoordinator', async (user, thunkAPI) => {
    try {
        console.log('Login coordinator attempt with:', user)
        const response = await authService.loginCoordinator(user)
        console.log('Login coordinator response:', response)
        return response
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            // Register participant
            .addCase(registerParticipant.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerParticipant.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                console.log('Register participant success:', action.payload)
            })
            .addCase(registerParticipant.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true    
                state.message = action.payload
                state.user = null
                console.log('Register participant error:', action.payload)
            })

            // Register coordinator
            .addCase(registerCoordinator.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerCoordinator.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                console.log('Register coordinator success:', action.payload)
            })
            .addCase(registerCoordinator.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true    
                state.message = action.payload
                state.user = null
                console.log('Register coordinator error:', action.payload)
            })

            // Login participant
            .addCase(loginParticipant.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginParticipant.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                console.log('Login participant success:', action.payload)
            })
            .addCase(loginParticipant.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true    
                state.message = action.payload
                state.user = null
                console.log('Login participant error:', action.payload)
            })

            // Login coordinator
            .addCase(loginCoordinator.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginCoordinator.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                console.log('Login coordinator success:', action.payload)
            })
            .addCase(loginCoordinator.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true    
                state.message = action.payload
                state.user = null
                console.log('Login coordinator error:', action.payload)
            })

            // Logout user
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer

