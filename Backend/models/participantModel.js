const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    role: {
        type: String,
        enum: ['coordinator', 'participant'],
        default: 'participant',
        required: true
    }
},
{
    timestamps: true,
    collection: 'Participants'  // Using correct capitalization
}); 

// Add pre-save middleware to log when a participant is being saved
participantSchema.pre('save', function(next) {
    console.log('Saving participant to collection:', this.collection.name);
    next();
});

const Participant = mongoose.model("Participant", participantSchema);

// Log when the model is created
console.log('Participant model created with collection name:', Participant.collection.name);

module.exports = Participant; 