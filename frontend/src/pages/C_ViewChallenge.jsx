/*
    CS 731/490AP Spring 2025
    Group Members:
                Julia Hu
                Anna Chu
    File Name: C_ViewChallenge.jsx
    For: Coordinators
*/

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getChallenges } from '../features/challenges/challengeSlice'
import { getLeaderboard } from '../features/leaderboard/leaderboardSlice'
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
    Button,
    CircularProgress
} from '@mui/material'
import { FaTrophy, FaComments, FaArrowLeft, FaPlus } from 'react-icons/fa'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import '../styles/pages.css'

function C_ViewChallenge() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { challenges, isLoading: challengesLoading } = useSelector((state) => state.challenge)
    const { leaderboard, isLoading: leaderboardLoading } = useSelector((state) => state.leaderboard)
    const [selectedChallenge, setSelectedChallenge] = useState(null)

    useEffect(() => {
        dispatch(getChallenges())
    }, [dispatch])

    useEffect(() => {
        if (challenges && challenges.length > 0) {
            const selectedChallengeId = localStorage.getItem('selectedChallengeId')
            const challenge = selectedChallengeId 
                ? challenges.find(c => c._id === selectedChallengeId)
                : challenges[0]
            
            if (challenge) {
                setSelectedChallenge(challenge)
                dispatch(getLeaderboard(challenge._id))
            }
        }
    }, [dispatch, challenges])

    if (!challenges || challengesLoading || !selectedChallenge) {
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
            <IconButton onClick={() => navigate('/view-challenge')} sx={{position: 'absolute', left: 450, mt: 5}}>
                <ArrowBackIosNewIcon />
            </IconButton>

            {/* Challenge Title */}
            <Typography variant="h4" component="h1" gutterBottom sx={{ 
                color: '#1976d2',
                mb: 4,
                mt: 4,
                textAlign: 'center'
            }}>
                {selectedChallenge.name}
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
                                        secondary={selectedChallenge.description}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText 
                                        primary="Type" 
                                        secondary={selectedChallenge.type}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText 
                                        primary="Goal" 
                                        secondary={selectedChallenge.goal}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText 
                                        primary="Frequency" 
                                        secondary={selectedChallenge.frequency}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText 
                                        primary="Date Range" 
                                        secondary={`${new Date(selectedChallenge.startDate).toLocaleDateString()} to ${new Date(selectedChallenge.endDate).toLocaleDateString()}`}
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
                                {leaderboardLoading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                        <CircularProgress />
                                    </Box>
                                ) : leaderboard && leaderboard.length > 0 ? (
                                    leaderboard.map((entry, index) => (
                                        <React.Fragment key={entry._id}>
                                            <ListItem>
                                                <ListItemText
                                                    primary={
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Typography variant="body1">
                                                                {index + 1}. {entry.participant.name}
                                                            </Typography>
                                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                                {entry.points} pts
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            </ListItem>
                                            {index < leaderboard.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <ListItem>
                                        <ListItemText primary="No participants enrolled yet" />
                                    </ListItem>
                                )}
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