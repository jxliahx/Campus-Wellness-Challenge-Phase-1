/*
    CS 731/490AP Spring 2025
    Group Members:
                Julia Hu
                Anna Chu
    File Name: C_CreateChallenge.jsx
    For: Coordinators
*/

import React, {useState} from 'react'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Icon,
  Grid,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import { FaPlusCircle } from 'react-icons/fa'
import '../styles/pages.css'

function CreateChallenge() {
    const [challengeData, setChallengeData] = useState ({
        title: '',
        description: '',
        achievement: '',
        duration: '',
        resource: ''
    })

    const {title, description, achievement, duration, resource} = challengeData

    const onChange = (e) => {
        setChallengeData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // LATER: ADD CODE TO SUBMIT THE DATA 
        console.log('Challenge Create: ', challengeData)
    }

    const navigate = useNavigate()

    return (
        <Container component="main" maxWidth="md" className="page-container">
            <Paper className="auth-container">
                <Box>
                    <Typography>
                        <Icon sx={{fontSize: '2rem'}}>
                            <FaPlusCircle />
                        </Icon>
                        Challenge Creation
                    </Typography>
                </Box>

                <Box componenet="form" onSubmit={onSubmit} className="auth-form" sx={{gap: 2}}>
                    {/* Challenge Name */}
                    <TextField
                        fullWidth
                        label="Challenge Title"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                    />

                    {/* Description */}
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={description}
                        onChange={onChange}
                        multiline
                        rows={5}
                        required
                    />

                    {/* Achievement Points */}
                    <TextField
                        fullWidth
                        label="Achievement"
                        name="achievement"
                        value={achievement}
                        onChange={onChange}
                        required
                    />

                    {/* Bottom 2 Input Boxes */}
                    <Grid container spacing={2}>

                        {/* Duration of Challenge */}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="(e.g. 30 days)"
                                name="duration"
                                value={duration}
                                onChange={onChange}
                                required
                                sx={{height: '100%'}}
                            />
                        </Grid>

                        {/* Additional Resources */}
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                sx={{height: '100%'}}
                                // LATER: ADD CODE TO SUBMIT THE DATA 
                                onClick={() => navigate('/upload-resource')}
                            >
                            Upload Resources
                            </Button>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        className="primary-button"
                        // LATER: LINK TO CHALLENGE LIST PAGE
                    >
                    Share Challenge
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default CreateChallenge