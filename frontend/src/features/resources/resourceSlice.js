import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resourceService from './resourceService'

const initialState = {
    resources: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

// Upload resource
export const uploadResource = createAsyncThunk(
    'resources/upload',
    async (resourceData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await resourceService.uploadResource(resourceData, token)
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get challenge resources
export const getChallengeResources = createAsyncThunk(
    'resources/getAll',
    async (challengeId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await resourceService.getChallengeResources(challengeId, token)
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Delete resource
export const deleteResource = createAsyncThunk(
    'resources/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await resourceService.deleteResource(id, token)
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const resourceSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadResource.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadResource.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.resources.push(action.payload)
            })
            .addCase(uploadResource.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getChallengeResources.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getChallengeResources.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.resources = action.payload
            })
            .addCase(getChallengeResources.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteResource.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteResource.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.resources = state.resources.filter(
                    (resource) => resource._id !== action.payload.id
                )
            })
            .addCase(deleteResource.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = resourceSlice.actions
export default resourceSlice.reducer 