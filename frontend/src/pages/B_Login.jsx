/*
    CS 731/490AP Spring 2025
    Group Members:
                Julia Hu
                Anna Chu
    File Name: B_Login.jsx
    For: Both coordinator and participants
*/

import React from 'react'
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginParticipant, loginCoordinator, reset } from '../features/auth/authSlice'
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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import '../styles/pages.css'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'participant' // Default to participant
    })
    
    const {email, password, role} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)   

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
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
        const userData = {
            email,
            password,
        }
        if (role === 'participant') {
            dispatch(loginParticipant(userData))
        } else {
            dispatch(loginCoordinator(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Container component="main" maxWidth="md" className="page-container">
            <Paper className="auth-container">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <Typography component="h1" variant="h4" className="auth-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon sx={{ color: '#1976d2', fontSize: '1.5rem' }}>
                            <FaSignInAlt />
                        </Icon>
                        Login
                    </Typography>
                </Box>
                
                <Typography variant="body1" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
                    Login and start setting goals
                </Typography>

                <Box component="form" onSubmit={onSubmit} className="auth-form">
                    <FormControl fullWidth>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            value={role}
                            label="Role"
                            onChange={onChange}
                        >
                            <MenuItem value="participant">Participant</MenuItem>
                            <MenuItem value="coordinator">Coordinator</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        autoFocus
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

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        className="primary-button"
                    >
                        Login
                    </Button>

                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Don't have an account yet?{' '}
                            <Link component={RouterLink} to="/pick-role" color="primary">
                                Sign up here
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}

export default Login