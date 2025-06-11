const express = require('express')
const router = express.Router()
const { createChallenge, getChallenges, getChallenge } = require('../controllers/challengeController')
const { protect } = require('../middleware/authMiddleware')

router.route('/')
    .post(protect, )
    .get(protect, getChallenges)

router.route('/:id')
    .get(protect, getChallenge)

module.exports = router 