const express = require('express')
const router = express.Router()
const { registerParticipant, loginParticipant, getMe, getParticipants } = require('../controllers/participantController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerParticipant)
router.post('/login', loginParticipant)
router.get('/me', protect, getMe)
router.get('/', protect, getParticipants)

module.exports = router 