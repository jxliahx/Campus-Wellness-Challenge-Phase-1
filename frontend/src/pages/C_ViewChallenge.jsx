/*
    CS 731/490AP Spring 2025
    Group Members:
                Julia Hu
                Anna Chu
    File Name: C_ViewChallenge.jsx
    For: Coordinators
*/

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    Paper,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Button,
    Grid,
    Divider,
    Card,
    CardContent,
    ListItemButton
} from '@mui/material'
import { FaPlus, FaUserPlus, FaTrophy } from 'react-icons/fa'
import '../styles/pages.css'

function C_ViewChallenge() {
    const navigate = useNavigate()
    const [selectedChallenge, setSelectedChallenge] = useState(null)

    // Mock data for now
    const challenges = [
        {
            id: 1,
            name: 'Daily Steps Challenge',
            description: 'Walk 10,000 steps every day',
            startDate: '2024-03-01',
            endDate: '2024-03-31',
            participants: 25
        },
        {
            id: 2,
            name: 'Weekly Workout Challenge',
            description: 'Complete 3 workouts per week',
            startDate: '2024-03-01',
            endDate: '2024-03-31',
            participants: 15
        }
    ]

    // Mock data for leaderboard
    const leaderboard = [
        { rank: 1, name: 'John Doe', score: 9500 },
        { rank: 2, name: 'Jane Smith', score: 9200 },
        { rank: 3, name: 'Mike Johnson', score: 8900 },
        { rank: 4, name: 'Sarah Williams', score: 8500 },
        { rank: 5, name: 'David Brown', score: 8200 },
        { rank: 6, name: 'Emily Davis', score: 8100 },
        { rank: 7, name: 'Michael Wilson', score: 8000 },
        { rank: 8, name: 'Lisa Anderson', score: 7900 },
        { rank: 9, name: 'James Taylor', score: 7800 },
        { rank: 10, name: 'Emma Martinez', score: 7700 },
        { rank: 11, name: 'Robert Garcia', score: 7600 },
        { rank: 12, name: 'Sophia Lee', score: 7500 },
        { rank: 13, name: 'William Clark', score: 7400 },
        { rank: 14, name: 'Olivia Rodriguez', score: 7300 },
        { rank: 15, name: 'Daniel White', score: 7200 }
    ]

    return (
        <Container component="main" className="page-container" sx={{ 
            mt: 4,
            maxWidth: '1800px !important',
            width: '100%'
        }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ 
                color: '#1976d2',
                mb: 4,
                mt: 4,
                textAlign: 'center'
            }}>
                Challenge
            </Typography>
            <Grid container spacing={3}>
                {/* Left Section - Challenges List and Buttons */}
                <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Paper sx={{ p: 2, mb: 2, flexGrow: 1 }}>
                            <Typography variant="h6" component="h2" gutterBottom sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 1,
                                color: '#1976d2'
                            }}>
                                <FaTrophy />
                                Challenges
                            </Typography>
                            <List>
                                {challenges.map((challenge) => (
                                    <React.Fragment key={challenge.id}>
                                        <ListItemButton
                                            selected={selectedChallenge?.id === challenge.id}
                                            onClick={() => setSelectedChallenge(challenge)}
                                        >
                                            <ListItemText
                                                primary={challenge.name}
                                                secondary={
                                                    <>
                                                        <Typography component="span" variant="body2" color="text.primary">
                                                            {challenge.description}
                                                        </Typography>
                                                        <br />
                                                        <Typography component="span" variant="caption" color="text.secondary">
                                                            {challenge.startDate} to {challenge.endDate}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItemButton>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<FaPlus />}
                                onClick={() => navigate('/create-challenge')}
                                fullWidth
                            >
                                Create Challenge
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<FaUserPlus />}
                                onClick={() => navigate('/enroll-participant')}
                                fullWidth
                            >
                                Enroll Participant
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                {/* Right Section - Leaderboard and Forum */}
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2} direction="column" sx={{ height: '100%' }}>
                        {/* Leaderboard Section */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" component="h2" gutterBottom sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    color: '#1976d2'
                                }}>
                                    <FaTrophy />
                                    Leaderboard
                                </Typography>
                                <List sx={{ 
                                    maxHeight: '250px', 
                                    overflow: 'auto',
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        background: '#f1f1f1',
                                        borderRadius: '4px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: '#888',
                                        borderRadius: '4px',
                                        '&:hover': {
                                            background: '#555',
                                        },
                                    },
                                }}>
                                    {leaderboard.map((entry) => (
                                        <React.Fragment key={entry.rank}>
                                            <ListItem>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                            <Typography variant="body1" sx={{ fontWeight: 'bold', minWidth: '30px' }}>
                                                                #{entry.rank}
                                                            </Typography>
                                                            <Typography variant="body1">
                                                                {entry.name}
                                                            </Typography>
                                                            <Typography variant="body1" sx={{ marginLeft: 'auto' }}>
                                                                {entry.score} pts
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider />
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>

                        {/* Forum posts */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, minHeight: '300px' }}>
                                <Typography variant="h6" component="h2" gutterBottom sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    color: '#1976d2'
                                }}>
                                    Forum Posts
                                </Typography>
                                {/* Forum stuff */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default C_ViewChallenge