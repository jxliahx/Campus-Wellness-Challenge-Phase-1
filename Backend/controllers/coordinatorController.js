const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Coordinator = require('../models/coordinatorModel')

// @desc Register new coordinator
// @route POST /api/coordinators
// @access Public
const registerCoordinator = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }   

    // Check if coordinator exists
    const coordinatorExists = await Coordinator.findOne({email})

    if(coordinatorExists) {
        res.status(400)
        throw new Error('Coordinator already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)   

    console.log('Creating new coordinator');
    
    // Create coordinator
    const coordinator = await Coordinator.create({
        name,
        email,
        password: hashedPassword,
        role: 'coordinator'
    })

    console.log('Coordinator created successfully:', {
        id: coordinator._id,
        name: coordinator.name,
        email: coordinator.email,
        role: coordinator.role,
        collection: coordinator.collection.name
    });

    if(coordinator) {  
        res.status(201).json({
            _id: coordinator.id,
            name: coordinator.name,
            email: coordinator.email,
            role: coordinator.role,
            token: generateToken(coordinator._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid coordinator data')
    }
})

// @desc Authenticate a coordinator
// @route POST /api/coordinators/login
// @access Public
const loginCoordinator = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    // Check for coordinator email
    const coordinator = await Coordinator.findOne({email})

    if(coordinator && (await bcrypt.compare(password, coordinator.password))) {
        res.json({
            _id: coordinator.id,
            name: coordinator.name,
            email: coordinator.email,
            role: coordinator.role,
            token: generateToken(coordinator._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

// @desc Get coordinator data
// @route GET /api/coordinators/me
// @access Private
const getMe = asyncHandler(async(req, res) => {
    const { _id, name, email, role } = await Coordinator.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        role
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerCoordinator,
    loginCoordinator,
    getMe
} 