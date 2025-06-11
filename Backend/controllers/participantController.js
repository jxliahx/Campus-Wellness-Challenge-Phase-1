const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Participant = require('../models/participantModel')

// @desc Register new participant
// @route POST /api/participants
// @access Public
const registerParticipant = asyncHandler(async(req, res) => {
    const { name, email, password, role } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }   

    // Check if participant exists
    const participantExists = await Participant.findOne({email})

    if(participantExists) {
        res.status(400)
        throw new Error('Participant already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)   

    console.log('Creating new participant with role:', role || 'participant');
    
    // Create participant
    const participant = await Participant.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'participant' // Default to participant if no role specified
    })

    console.log('Participant created successfully:', {
        id: participant._id,
        name: participant.name,
        email: participant.email,
        role: participant.role,
        collection: participant.collection.name
    });

    if(participant) {  
        const response = {
            _id: participant.id,
            name: participant.name,
            email: participant.email,
            role: participant.role,
            token: generateToken(participant._id)
        }
        console.log('Sending registration response:', response)
        res.status(201).json(response)
    } else {
        res.status(400)
        throw new Error('Invalid participant data')
    }
})

// @desc Authenticate a participant
// @route POST /api/participants/login
// @access Public
const loginParticipant = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    console.log('Login attempt for email:', email)

    // Check for participant email
    const participant = await Participant.findOne({email})

    if(!participant) {
        console.log('No participant found with email:', email)
        res.status(401)
        throw new Error('Invalid credentials')
    }

    console.log('Found participant:', {
        id: participant._id,
        email: participant.email,
        role: participant.role
    })

    const isMatch = await bcrypt.compare(password, participant.password)
    console.log('Password match:', isMatch)

    if(participant && isMatch) {
        const response = {
            _id: participant.id,
            name: participant.name,
            email: participant.email,
            role: participant.role,
            token: generateToken(participant._id)
        }
        console.log('Sending login response:', response)
        res.json(response)
    } else {
        console.log('Invalid credentials for email:', email)
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

// @desc Get participant data
// @route GET /api/participants/me
// @access Private
const getMe = asyncHandler(async(req, res) => {
    const { _id, name, email, role } = await Participant.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        role
    })
})

// @desc Get all participants
// @route GET /api/participants
// @access Private
const getParticipants = asyncHandler(async(req, res) => {
    const participants = await Participant.find({}).select('-password')
    res.status(200).json(participants)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerParticipant,
    loginParticipant,
    getMe,
    getParticipants
} 