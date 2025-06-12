const mongoose = require('mongoose')

const leaderboardSchema = mongoose.Schema({
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Challenge'
    },
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Participant'
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

// Create a compound index to ensure a participant can only be enrolled once per challenge
leaderboardSchema.index({ challenge: 1, participant: 1 }, { unique: true })

module.exports = mongoose.model('Leaderboard', leaderboardSchema) 