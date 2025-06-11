// /*
//     CS 731/490AP Spring 2025
//     Group Members:
//                 Julia Hu
//                 Anna Chu
//     File Name: B_Logout.jsx
//     For: Both coordinator and participants
// */

// import React from 'react'
// import { 
//   Container, 
//   Typography, 
//   Button, 
//   Box,
//   Paper
// } from '@mui/material'
// import { useDispatch, userSelector } from 'react-redux'
// import { logout, reset } from '../features/auth/authSlice'
// import { useNavigate } from 'react-router-dom'
// import CloseIcon from '@mui/icons-material/Close'
// import '../styles/pages.css';

// function Logout() {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const {user} = useSelector(/*(state) => state.auth*/)

//     const handleConfirmLogout = () => {
//         dispaych(logout())
//         dispatch(reset())
//         navigate('/')
//     }

//     const handleCanel = () => {
//         navigate('/')
//     }

//     return (
//         <Box
//             sx={{
//                 height: '100vh', 
//                 display: 'flex', 
//                 justifyContent: 'center', 
//                 alignItems: 'center', 
//                 backgroundColor: '#f5f5f5',
//                 }}
//         >
//             <Paper elevation={3}
//             >

//             </Paper>
//         </Box>
//     )
// }