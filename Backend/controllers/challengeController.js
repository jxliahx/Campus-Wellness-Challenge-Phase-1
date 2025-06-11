const Challenge = require('../models/challengeModel')
const asyncHandler = require('express-async-handler')

// @desc    Create new challenge
// @route   POST /api/challenges
// @access  Private
const createChallenge = asyncHandler(async (req, res) => {
    const { name, description, startDate, endDate, type, goal, frequency } = req.body

    if (!name || !description || !startDate || !endDate || !type || !goal || !frequency) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    // Create challenge
    const challenge = await Challenge.create({
        name,
        description,
        startDate,
        endDate,
        type,
        goal,
        frequency,
        createdBy: req.coordinator.id
    })

    if (challenge) {
        res.status(201).json(challenge)
    } else {
        res.status(400)
        throw new Error('Invalid challenge data')
    }
})

// @desc    Get all challenges for a coordinator
// @route   GET /api/challenges
// @access  Private
const getChallenges = asyncHandler(async (req, res) => {
    const challenges = await Challenge.find({ createdBy: req.coordinator.id })
    res.status(200).json(challenges)
})

// @desc    Get single challenge
// @route   GET /api/challenges/:id
// @access  Private
const getChallenge = asyncHandler(async (req, res) => {
    const challenge = await Challenge.findById(req.params.id)

    if (!challenge) {
        res.status(404)
        throw new Error('Challenge not found')
    }

    // Check for coordinator
    if (challenge.createdBy.toString() !== req.coordinator.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    res.status(200).json(challenge)
})

module.exports = {
    createChallenge,
    getChallenges,
    getChallenge
} 