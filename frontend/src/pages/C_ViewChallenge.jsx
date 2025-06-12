/*
    CS 731/490AP Spring 2025
    Group Members:
                Julia Hu
                Anna Chu
    File Name: C_ViewChallenge.jsx
    For: Coordinators
*/

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getChallenges } from '../features/challenges/challengeSlice'
import {
    Container,
    Paper,
    Typography,
    Box,
    Divider,
    IconButton,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Button
} from '@mui/material'
import { FaTrophy, FaComments, FaArrowLeft, FaPlus } from 'react-icons/fa'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import '../styles/pages.css'

function C_ViewChallenge() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { challenges, isLoading } = useSelector((state) => state.challenge)

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

    useEffect(() => {
        dispatch(getChallenges())
    }, [dispatch])

    if (!challenges || isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Container component="main" className="page-container" sx={{ 
            mt: 5,
            maxWidth: '1800px !important',
            width: '100%'
        }}>
            {/* Back Button */}
            <IconButton 
                onClick={() => navigate('/coordinator-dashboard')} 
                sx={{ position: 'absolute', left: 20, top: 20 }}
            >
                <FaArrowLeft />
            </IconButton>

            {/* Back Arrow */}
            <IconButton onClick={() => navigate('/coordinator-dashboard')} sx={{position: 'absolute', left: 450, mt: 5}}>
                <ArrowBackIosNewIcon />
            </IconButton>

            {/* Challenge Title */}
            <Typography variant="h4" component="h1" gutterBottom sx={{ 
                color: '#1976d2',
                mb: 4,
                mt: 4,
                textAlign: 'center'
            }}>
                Challenges
            </Typography>

            <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                px: 2
            }}>
                <Grid container spacing={3} sx={{ 
                    maxWidth: '1200px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 3
                }}>
                    {/* Top Left - Challenge Details */}
                    <Grid item>
                        <Paper sx={{ 
                            p: 2, 
                            height: '100%',
                            aspectRatio: '1/1',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography variant="h6" component="h2" gutterBottom sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 1,
                                color: '#1976d2'
                            }}>
                                <FaTrophy />
                                Challenge Details
                            </Typography>
                            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
                                <ListItem>
                                    <ListItemText 
                                        primary="Description" 
                                        secondary={challenges[0]?.description}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText 
                                        primary="Type" 
                                        secondary={challenges[0]?.type}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText 
                                        primary="Goal" 
                                        secondary={challenges[0]?.goal}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText 
                                        primary="Frequency" 
                                        secondary={challenges[0]?.frequency}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText 
                                        primary="Date Range" 
                                        secondary={`${new Date(challenges[0]?.startDate).toLocaleDateString()} to ${new Date(challenges[0]?.endDate).toLocaleDateString()}`}
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>

                    {/* Top Right - Leaderboard */}
                    <Grid item>
                        <Paper sx={{ 
                            p: 2, 
                            height: '100%',
                            aspectRatio: '1/1',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
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
                                flexGrow: 1,
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

                    {/* Bottom Left - Challenges Block */}
                    <Grid item>
                        <Paper sx={{ 
                            p: 2, 
                            height: '100%',
                            aspectRatio: '1/1',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography variant="h6" component="h2" gutterBottom sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 1,
                                color: '#1976d2'
                            }}>
                                <FaTrophy />
                                Challenges
                            </Typography>
                            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
                                {challenges && challenges.length > 0 ? (
                                    challenges.map((challenge) => (
                                        <React.Fragment key={challenge._id}>
                                            <ListItem>
                                                <ListItemText 
                                                    primary={challenge.name}
                                                    secondary={challenge.description}
                                                />
                                            </ListItem>
                                            <Divider />
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <ListItem>
                                        <ListItemText 
                                            primary="No challenges created yet"
                                            secondary="Create a new challenge to get started"
                                        />
                                    </ListItem>
                                )}
                            </List>
                            <Box sx={{ 
                                flexGrow: 1, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center'
                            }}>
                                <Button
                                    variant="contained"
                                    startIcon={<FaPlus />}
                                    onClick={() => navigate('/challenge-detail')}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        backgroundColor: '#1976d2',
                                        '&:hover': {
                                            backgroundColor: '#1565c0'
                                        }
                                    }}
                                >
                                    Create challenge
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Bottom Right - Forum */}
                    <Grid item>
                        <Paper sx={{ 
                            p: 2, 
                            height: '100%',
                            aspectRatio: '1/1',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography variant="h6" component="h2" gutterBottom sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 1,
                                color: '#1976d2'
                            }}>
                                <FaComments />
                                Forum Posts
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Forum discussions will be displayed here
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Enroll Button */}
            <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
                mb: 4
            }}>
                <Button
                    variant="contained"
                    onClick={() => navigate('/enroll-participant')}
                    sx={{
                        backgroundColor: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#1565c0'
                        },
                        minWidth: '200px'
                    }}
                >
                    Enroll Participant in Challenge
                </Button>
            </Box>
        </Container>
    )
}

export default C_ViewChallenge