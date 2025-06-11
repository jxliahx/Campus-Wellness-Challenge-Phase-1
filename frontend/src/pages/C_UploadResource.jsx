/*
    CS 731/490AP Spring 2025
    Group Members:
                Julia Hu
                Anna Chu
    File Name: C_UploadResource.jsx
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
import { FaCloudUploadAlt } from 'react-icons/fa'
import '../styles/pages.css'

function UploadResource() {
    const [resourceTitle, setResourceTitle] = useState('')
    const [dragActive, setDragActive] = useState(false)
    const navigate = useNavigate()
    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        }
        else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }
    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        const files = e.dataTransfer.files
        console.log('Dropped files: ', files)
        // LATER: HANDLE FILES
    }

    return (
        <Container component="main" maxWidth="md" className="page-container" sx={{pt: 10}}>
            <Paper elevation={3} sx={{p: 4, textAlign: 'center'}}>
                
                <Typography variant="h4" gutterBottom>
                    Upload Resource
                </Typography>

                <Box sx={{mb: 2}}>
                    <TextField
                        fullWidth
                        label="Resource Title"
                        value={resourceTitle}
                        onChange={(e) => setResourceTitle(e.target.value)}
                    />
                </Box>

                <Box
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    sx={{
                        border: dragActive ? '3px dashed #1976d2' : '2px dashed #aaa',
                        borderRadius: 2,
                        padding: 6,
                        backgroundColor: dragActive ? '#f0f8ff' : '#fafafa',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        transition: '0.3s ease-in-out',
                        minHeight: '250px',
                    }}
                >
                <Icon sx={{fontSize: '4rem', mb: 2}}>
                    <FaCloudUploadAlt />
                </Icon>
                <Typography variant="body1" color="text.secondary">
                    Drag & Drop Files Here
                </Typography>
                </Box>

                <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 4}}>
                    <Button variant="outlined" color="secondary" onClick={() => navigate('/create-challenge')}>
                        Cancel
                    </Button>

                    <Button variant="contained" color="primary" onClick={() => console.log('Upload Clicked')}>
                        Upload
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default UploadResource