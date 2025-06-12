const express = require('express')
const router = express.Router()
const { 
    uploadResource, 
    getChallengeResources, 
    deleteResource,
    upload 
} = require('../controllers/resourceController')
const { protect } = require('../middleware/authMiddleware')

// Upload a resource
router.post('/', protect, upload.single('file'), uploadResource)

// Get resources for a challenge
router.get('/:challengeId', protect, getChallengeResources)

// Delete a resource
router.delete('/:id', protect, deleteResource)

module.exports = router 