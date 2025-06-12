const mongoose = require('mongoose')

const challengeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a challenge name']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    startDate: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please add an end date']
    },
    type: {
        type: String,
        required: [true, 'Please add a challenge type']
    },
    goal: {
        type: String,
        required: [true, 'Please add a goal']
    },
    frequency: {
        type: String,
        required: [true, 'Please add a frequency']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Coordinator'
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant'
    }],
    status: {
        type: String,
        enum: ['Active', 'Completed', 'Cancelled'],
        default: 'Active'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Challenge', challengeSchema) 