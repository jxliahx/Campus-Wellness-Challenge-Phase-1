const mongoose = require('mongoose')

const resourceSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Challenge'
    },
    fileUrl: {
        type: String,
        required: [true, 'Please add a file URL']
    },
    fileName: {
        type: String,
        required: [true, 'Please add a file name']
    },
    fileSize: {
        type: Number,
        required: [true, 'Please add file size']
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'uploadedByModel'
    },
    uploadedByModel: {
        type: String,
        required: true,
        enum: ['Participant', 'Coordinator']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Resource', resourceSchema) 