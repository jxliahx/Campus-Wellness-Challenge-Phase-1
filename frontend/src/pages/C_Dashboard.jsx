/*
    CS 731/490AP Spring 2025
    Group Members:
                Julia Hu
                Anna Chu
    File Name: C_Dashboard.jsx
    For: Coordinators
*/

import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    Divider,
    Avatar,
    Grid,
    Card,
    CardContent,
    LinearProgress,
    CardActionArea
} from '@mui/material'
import { FaUser, FaPlus, FaUserPlus, FaTrophy } from 'react-icons/fa'
import '../styles/pages.css'

function C_Dashboard() {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    // Mock data for created challenges - replace with actual data from your backend
    const createdChallenges = [
        {
            id: 1,
            name: 'Daily Steps Challenge',
            description: 'Walk 10,000 steps every day',
            progress: 75,
            startDate: '2024-03-01',
            endDate: '2024-03-31',
            participants: 25
        },
        {
            id: 2,
            name: 'Weekly Workout Challenge',
            description: 'Complete 3 workouts per week',
            progress: 50,
            startDate: '2024-03-01',
            endDate: '2024-03-31',
            participants: 15
        }
    ]

    return (
        <Container component="main" maxWidth="md" className="page-container">
            <Paper className="dashboard-container" sx={{ p: 4 }}>
                {/* User Info Section */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    mb: 4,
                    p: 2,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1
                }}>
                    <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}>
                        <FaUser size={24} />
                    </Avatar>
                    <Box>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Welcome, {user?.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Role: Coordinator
                        </Typography>
                    </Box>
                </Box>

                {/* Created Challenges Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" component="h2" sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        color: '#1976d2',
                        mb: 2
                    }}>
                        <FaTrophy />
                        Your Challenges
                    </Typography>
                    <Grid container spacing={2}>
                        {createdChallenges.map((challenge) => (
                            <Grid item xs={12} sm={6} key={challenge.id}>
                                <Card>
                                    <CardActionArea onClick={() => navigate('/view-challenge')}>
                                        <CardContent>
                                            <Typography variant="h6" component="h3" gutterBottom>
                                                {challenge.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" paragraph>
                                                {challenge.description}
                                            </Typography>
                                            <Box sx={{ mb: 2 }}>
                                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                                    Progress: {challenge.progress}%
                                                </Typography>
                                                <LinearProgress 
                                                    variant="determinate" 
                                                    value={challenge.progress} 
                                                    sx={{ 
                                                        height: 8, 
                                                        borderRadius: 4,
                                                        backgroundColor: '#e0e0e0',
                                                        '& .MuiLinearProgress-bar': {
                                                            backgroundColor: '#1976d2'
                                                        }
                                                    }}
                                                />
                                            </Box>
                                            <Typography variant="caption" color="text.secondary" display="block">
                                                {challenge.startDate} to {challenge.endDate}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {challenge.participants} participants
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Action Buttons Section */}
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: 2
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<FaPlus />}
                        onClick={() => navigate('/create-challenge')}
                        sx={{ width: '100%', maxWidth: 400 }}
                    >
                        Create Challenge
                    </Button>

                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        width: '100%', 
                        maxWidth: 400,
                        my: 1
                    }}>
                        <Divider sx={{ flex: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
                            OR
                        </Typography>
                        <Divider sx={{ flex: 1 }} />
                    </Box>

                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        startIcon={<FaUserPlus />}
                        onClick={() => navigate('/enroll-participant')}
                        sx={{ width: '100%', maxWidth: 400 }}
                    >
                        Enroll Participant
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default C_Dashboard