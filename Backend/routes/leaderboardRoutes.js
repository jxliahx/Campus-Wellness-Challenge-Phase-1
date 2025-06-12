const express = require('express')
const router = express.Router()
const { enrollParticipants, getLeaderboard } = require('../controllers/leaderboardController')
const { protect } = require('../middleware/authMiddleware')

router.post('/enroll', protect, enrollParticipants)
router.get('/:challengeId', protect, getLeaderboard)

module.exports = router 