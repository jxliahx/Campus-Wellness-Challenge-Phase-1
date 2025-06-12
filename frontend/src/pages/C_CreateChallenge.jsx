/*
    CS 731/490AP Spring 2025
    Group Members:
                Julia Hu
                Anna Chu
    File Name: C_CreateChallenge.jsx
    For: Coordinators
*/

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createChallenge, reset } from '../features/challenges/challengeSlice'
import { toast } from 'react-toastify'
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Grid
} from '@mui/material'
import { FaPlus } from 'react-icons/fa'
import '../styles/pages.css'

function CreateChallenge() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        type: '',
        goal: '',
        frequency: ''
    })

    const { name, description, startDate, endDate, type, goal, frequency } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.challenge)

    // Check user role on component mount
    useEffect(() => {
        if (!user || user.role !== 'coordinator') {
            navigate('/login')
        }
    }, [user, navigate])

    // Handle form submission states
    useEffect(() => {
        if (isSuccess) {
            toast.success('Challenge created successfully!')
            dispatch(reset())
            navigate('/coordinator-dashboard')
        }

        if (isError) {
            toast.error(message)
            dispatch(reset())
        }
    }, [isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        // Validate form data
        if (!name || !description || !startDate || !endDate || !type || !goal || !frequency) {
            toast.error('Please fill in all fields')
            return
        }

        const challengeData = {
            name,
            description,
            startDate,
            endDate,
            type,
            goal,
            frequency
        }

        dispatch(createChallenge(challengeData))
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Container component="main" maxWidth="md" className="page-container" sx={{mt: 10}}>
            <Paper className="dashboard-container" sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ 
                    color: '#1976d2',
                    mb: 4,
                    textAlign: 'center'
                }}>
                    Create Challenge
                </Typography>

                <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Challenge Name"
                                name="name"
                                value={name}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                multiline
                                rows={4}
                                label="Description"
                                name="description"
                                value={description}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Start Date"
                                name="startDate"
                                type="date"
                                value={startDate}
                                onChange={onChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="End Date"
                                name="endDate"
                                type="date"
                                value={endDate}
                                onChange={onChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Challenge Type</InputLabel>
                                <Select
                                    name="type"
                                    value={type}
                                    label="Challenge Type"
                                    onChange={onChange}
                                >
                                    <MenuItem value="Physical Activity">Physical Activity</MenuItem>
                                    <MenuItem value="Nutrition">Nutrition</MenuItem>
                                    <MenuItem value="Mental Health">Mental Health</MenuItem>
                                    <MenuItem value="Sleep">Sleep</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Goal"
                                name="goal"
                                value={goal}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Frequency</InputLabel>
                                <Select
                                    name="frequency"
                                    value={frequency}
                                    label="Frequency"
                                    onChange={onChange}
                                >
                                    <MenuItem value="Daily">Daily</MenuItem>
                                    <MenuItem value="Weekly">Weekly</MenuItem>
                                    <MenuItem value="Monthly">Monthly</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        startIcon={<FaPlus />}
                    >
                        Create Challenge
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default CreateChallenge