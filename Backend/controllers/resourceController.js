const Resource = require('../models/resourceModel')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/'
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

// @desc    Upload a resource
// @route   POST /api/resources
// @access  Private
const uploadResource = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }

        // Determine if user is a coordinator or participant
        const uploadedByModel = req.user.role === 'coordinator' ? 'Coordinator' : 'Participant'

        const resource = await Resource.create({
            title: req.body.title,
            challenge: req.body.challengeId,
            fileUrl: `/uploads/${req.file.filename}`, // Store relative URL for frontend access
            fileName: req.file.originalname,
            fileSize: req.file.size,
            uploadedBy: req.user.id,
            uploadedByModel: uploadedByModel
        })

        res.status(201).json(resource)
    } catch (error) {
        console.error('Error uploading resource:', error)
        res.status(500).json({ message: 'Error uploading resource' })
    }
}

// @desc    Get resources for a challenge
// @route   GET /api/resources/:challengeId
// @access  Private
const getChallengeResources = async (req, res) => {
    try {
        const resources = await Resource.find({ challenge: req.params.challengeId })
            .populate({
                path: 'uploadedBy',
                select: 'name',
                refPath: 'uploadedByModel'
            })
            .sort('-createdAt')

        res.status(200).json(resources)
    } catch (error) {
        console.error('Error getting resources:', error)
        res.status(500).json({ message: 'Error getting resources' })
    }
}

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private
const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id)

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' })
        }

        // Check if user is the uploader
        if (resource.uploadedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        // Delete file from filesystem
        const filePath = path.join(__dirname, '..', resource.fileUrl)
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }

        await resource.deleteOne()

        res.status(200).json({ message: 'Resource deleted' })
    } catch (error) {
        console.error('Error deleting resource:', error)
        res.status(500).json({ message: 'Error deleting resource' })
    }
}

module.exports = {
    uploadResource,
    getChallengeResources,
    deleteResource,
    upload
} 