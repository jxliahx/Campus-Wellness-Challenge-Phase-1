/*
    CS 731/490AP Spring 2025
    Group Members:
                Julia Hu
                Anna Chu
    File Name: C_Register.jsx
    For: Both coordinator and participants
*/

import React from 'react'
import { useState, useEffect } from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerCoordinator, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Icon,
  Link,
  IconButton
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import '../styles/pages.css'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })
    
    const {name, email, password, password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)   

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/coordinator-dashboard')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
                role: 'coordinator'
            }
            dispatch(registerCoordinator(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Container component="main" maxWidth="md" className="page-container">
        {/* Back Arrow */}
        <IconButton onClick={() => navigate('/')} sx={{position: 'absolute', left: 450, mt: 6}}>
            <ArrowBackIosNewIcon />
        </IconButton>

            <Paper className="auth-container">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <Typography component="h1" variant="h4" className="auth-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon sx={{ color: '#1976d2', fontSize: '1.5rem' }}>
                            <FaUserPlus />
                        </Icon>
                        Register as Coordinator
                    </Typography>
                </Box>
                
                <Typography variant="body1" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
                    Create an account and start setting goals
                </Typography>

                <Box component="form" onSubmit={onSubmit} className="auth-form">
                    <TextField
                        fullWidth
                        label="Name"
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                        autoFocus
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                    
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        className="primary-button"
                    >
                        Register
                    </Button>

                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{' '}
                            <Link component={RouterLink} to="/login" color="primary">
                                Sign in here
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}

export default Register