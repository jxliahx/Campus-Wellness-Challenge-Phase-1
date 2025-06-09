import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Icon
} from '@mui/material'
import '../styles/pages.css'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <AppBar 
            position="fixed" 
            className="header-container"
            sx={{ 
                width: '100vw',
                left: 0,
                right: 0
            }}
        >
            <Toolbar className="header-content" disableGutters>
                <Link to="/" className="logo-link">
                    <Typography variant="h6" component="div">
                        Campus Wellness Challenge
                    </Typography>
                </Link>

                <Box component="nav">
                    {user ? (
                        <Button
                            onClick={onLogout}
                            className="header-button"
                            startIcon={<Icon><FaSignOutAlt /></Icon>}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                component={Link}
                                to="/login"
                                className="header-button"
                                startIcon={<Icon><FaSignInAlt /></Icon>}
                            >
                                Login
                            </Button>
                            <Button
                                component={Link}
                                to="/register"
                                className="header-button"
                                startIcon={<Icon><FaUser /></Icon>}
                            >
                                Register
                            </Button>
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header