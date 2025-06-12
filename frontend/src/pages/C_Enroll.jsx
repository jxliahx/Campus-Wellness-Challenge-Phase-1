/*
    CS 731/490AP Spring 2025
    Group Members:
                Julia Hu
                Anna Chu
    File Name: C_Enroll.jsx
    For: Coordinators
*/

import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    Divider,
    Avatar,
    Grid,
    IconButton,
} from '@mui/material'
import { FaCheck, FaPlus } from 'react-icons/fa'
import '../styles/pages.css'

function EnrollParticipant() {
    // Mock Data, Replace with DB
    const dummyUsers = [
        {id: 1, name: 'John Doe', email: 'john@john.com'},
        {id: 2, name: 'Jane Doe', email: 'jane@jane.com'},
    ]

    const dummyChallenges = [
        {id: 1, title: '30-Day-Bike-Ride'},
        {id: 2, title: 'Mediation Morning'},
    ]

    const [selectedUsers, setSelectedUSers] = useState([])

    const [selectedChallenges, setSelectedChallenges] = useState([])

    const toggleUser = (id) => {
        setSelectedUSers((prev) => prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id])
    }

    const toggleChallenge = (id) => {
        setSelectedChallenges((prev) => prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id])
    }

    return (
        <Box className="enroll-page" sx={{mt: 15, textAlign: 'center'}}>
            <Typography variant="h4" sx={{mb: 4}}>
                Enroll
            </Typography>

            <Box sx={{display: 'flex', justifyContent: 'center', gap: 4}}>

                {/* Left: Participants */}
                <Paper elevation={3} sx={{p: 3, width: '300px', minHeight: '400px'}}>

                    <Typography variant="h6" sx={{mb: 2}}>
                        Participants
                    </Typography>

                    <Divider sx={{mb: 2}} />
                    {
                        dummyUsers.map(user => (
                          <Box
                            key={user.id}
                            sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}
                          >
                            <Box sx={{textAlign: 'left'}}>
                                <Typography>{user.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                            </Box>

                            <IconButton onClick={() => toggleUser(user.id)}>
                                {selectedUsers.includes(user.id) ? <FaCheck color="green" /> : <FaPlus />}
                            </IconButton>
                         </Box>  
                        ))
                    }
                </Paper>

                {/* Right: Challenges */}
                <Paper elevation={3} sx={{p: 3, width: '300px', minHeight: '400px'}}>
                    <Typography variant="h6" sx={{mb: 2}}>
                        Challenges
                    </Typography>
                    
                    <Divider sx={{mb: 2}} />

                    {dummyChallenges.map(challenge => (
                        <Box
                            key={challenge.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2
                            }}
                        >
                            <Typography>{challenge.title}</Typography>

                            <IconButton onClick={() => toggleChallenge(challenge.id)}>
                                {selectedChallenges.includes(challenge.id) ? <FaCheck color="green" /> : <FaPlus />}
                            </IconButton>
                        </Box>
                    ))}
                </Paper>
            </Box>
             <Button 
                variant="contained"
                sx={{px: 4, py: 2, mt: 3}}

                // TODO: Backend Logic
                onClick={() => {
                    console.log("Selected Users: ", selectedUsers)
                    console.log("Selected Challenges: ", selectedChallenges)

                    // LOGIC HERE(?)
                }}
             >
                Enroll
            </Button>
        </Box>
    )
}

export default EnrollParticipant