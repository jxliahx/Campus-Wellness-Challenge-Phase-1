/*
    CS 731/490AP Spring 2025
    Group Members:
                Julia Hu
                Anna Chu
    File Name: B_PickRole.jsx
    For: Role selection page
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box,
  Paper
} from '@mui/material';
import '../styles/pages.css';
import { useAuth } from '../context/AuthContext';

function PickRole() {
  const navigate = useNavigate();
  const { user, login, register, logout } = useAuth();

  return (
    <Container component="main" maxWidth="sm" className="page-container">
      <Paper className="homepage-container">
        <Typography 
          component="h1" 
          variant="h2" 
          className="welcome-text"
          sx={{ mb: 4 }}
        >
          Select Your Role
        </Typography>
        
        <Box className="button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/register/participant')}
            size="large"
            className="primary-button"
            sx={{ mb: 2, width: '200px', height: '48px' }}
          >
            Participant
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/register/coordinator')}
            size="large"
            className="secondary-button"
            sx={{ width: '200px', height: '48px' }}
          >
            Coordinator
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default PickRole;
