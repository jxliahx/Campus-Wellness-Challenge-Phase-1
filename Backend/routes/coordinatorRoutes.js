const express = require('express')
const router = express.Router()
const { registerCoordinator, loginCoordinator, getMe } = require('../controllers/coordinatorController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerCoordinator)
router.post('/login', loginCoordinator)
router.get('/me', protect, getMe)

module.exports = router 