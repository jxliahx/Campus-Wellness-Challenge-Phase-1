import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome, FaTrophy } from 'react-icons/fa'
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
import logo from '../images/logo.png'

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
                    <img src={logo} alt="Logo" style={{height: '30px'}}/>
                    <Typography variant="h6" component="div">
                        Campus Wellness Challenge
                    </Typography>
                </Link>

                <Box component="nav">
                    <ul className='nav-list'>
                        <li>
                            <Link to='/leaderboard' className='header-button'>
                                <Icon><FaTrophy /></Icon>
                                Leaderboard
                            </Link>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <Link to='/dashboard' className='header-button'>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Button
                                        onClick={onLogout}
                                        className="header-button"
                                        startIcon={<Icon><FaSignOutAlt /></Icon>}
                                    >
                                        Logout
                                    </Button>
                                </li>
                            </>
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
                                    to="/pick-role"
                                    className="header-button"
                                    startIcon={<Icon><FaUser /></Icon>}
                                >
                                    Register
                                </Button>
                            </Box>
                        )}
                    </ul>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header