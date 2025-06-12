const asyncHandler = require('express-async-handler')
const Leaderboard = require('../models/leaderboardModel')
const Challenge = require('../models/challengeModel')
const Participant = require('../models/participantModel')

// @desc Enroll participants in a challenge
// @route POST /api/leaderboard/enroll
// @access Private
const enrollParticipants = asyncHandler(async (req, res) => {
    const { challengeId, participantIds } = req.body

    if (!challengeId || !participantIds || !Array.isArray(participantIds)) {
        res.status(400)
        throw new Error('Please provide a challenge ID and an array of participant IDs')
    }

    // Verify the challenge exists
    const challenge = await Challenge.findById(challengeId)
    if (!challenge) {
        res.status(404)
        throw new Error('Challenge not found')
    }

    // Verify all participants exist
    const participants = await Participant.find({ _id: { $in: participantIds } })
    if (participants.length !== participantIds.length) {
        res.status(404)
        throw new Error('One or more participants not found')
    }

    // Create leaderboard entries for each participant
    const enrollments = await Promise.all(
        participantIds.map(async (participantId) => {
            try {
                return await Leaderboard.create({
                    challenge: challengeId,
                    participant: participantId,
                    points: 0
                })
            } catch (error) {
                // If participant is already enrolled, skip them
                if (error.code === 11000) {
                    console.log(`Participant ${participantId} is already enrolled in challenge ${challengeId}`)
                    return null
                }
                throw error
            }
        })
    )

    // Filter out null values (already enrolled participants)
    const successfulEnrollments = enrollments.filter(enrollment => enrollment !== null)

    res.status(201).json({
        message: `Successfully enrolled ${successfulEnrollments.length} participants`,
        enrollments: successfulEnrollments
    })
})

// @desc Get leaderboard for a challenge
// @route GET /api/leaderboard/:challengeId
// @access Private
const getLeaderboard = asyncHandler(async (req, res) => {
    const { challengeId } = req.params

    const leaderboard = await Leaderboard.find({ challenge: challengeId })
        .populate('participant', 'name email')
        .sort({ points: -1 })

    res.status(200).json(leaderboard)
})

module.exports = {
    enrollParticipants,
    getLeaderboard
} 