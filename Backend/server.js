const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')
const port = process.env.PORT || 5000

// Connect to database
connectDB()

const app = express()

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/challenges', require('./routes/goalRoutes'))
app.use('/api/participants', require('./routes/participantRoutes'))
app.use('/api/coordinators', require('./routes/coordinatorRoutes'))

// Error handler
app.use(errorHandler)

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`))

const MONGO_URI = process.env.MONGO_URI || 'your_fallback_connection_string';


