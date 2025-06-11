/*
    CS 731/490AP Spring 2025
    Group Members:
                Julia Hu
                Anna Chu
    File Name: P_Dashboard.jsx
    For: Participants
*/

import React from 'react'
import { useSelector } from 'react-redux'
import {
    Container,
    Paper,
    Typography,
    Box,
    Avatar,
    Grid,
    Card,
    CardContent,
    LinearProgress,
    Divider
} from '@mui/material'
import { FaUser, FaTrophy, FaMedal } from 'react-icons/fa'
import '../styles/pages.css'

function P_Dashboard() {
    const { user } = useSelector((state) => state.auth)

    // Mock data for enrolled challenges - replace with actual data from your backend
    const enrolledChallenges = [
        {
            id: 1,
            name: 'Daily Steps Challenge',
            progress: 75,
            startDate: '2024-03-01',
            endDate: '2024-03-31',
            description: 'Walk 10,000 steps every day'
        },
        {
            id: 2,
            name: 'Weekly Workout Challenge',
            progress: 50,
            startDate: '2024-03-01',
            endDate: '2024-03-31',
            description: 'Complete 3 workouts per week'
        }
    ]

    // Mock data for achievements - replace with actual data from your backend
    const achievements = [
        {
            id: 1,
            name: 'First Steps',
            description: 'Completed your first challenge',
            date: '2024-03-15'
        },
        {
            id: 2,
            name: 'Consistency King',
            description: 'Logged in for 7 consecutive days',
            date: '2024-03-20'
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
                            Role: Participant
                        </Typography>
                    </Box>
                </Box>

                {/* Enrolled Challenges Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        color: '#1976d2'
                    }}>
                        <FaTrophy />
                        Enrolled Challenges
                    </Typography>
                    <Grid container spacing={2}>
                        {enrolledChallenges.map((challenge) => (
                            <Grid item xs={12} sm={6} key={challenge.id}>
                                <Card>
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
                                        <Divider sx={{ my: 1 }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {challenge.startDate} to {challenge.endDate}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Achievements Section */}
                <Box>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        color: '#1976d2'
                    }}>
                        <FaMedal />
                        Achievements
                    </Typography>
                    <Grid container spacing={2}>
                        {achievements.map((achievement) => (
                            <Grid item xs={12} sm={6} key={achievement.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" component="h3" gutterBottom>
                                            {achievement.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            {achievement.description}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Earned on {achievement.date}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}

export default P_Dashboard