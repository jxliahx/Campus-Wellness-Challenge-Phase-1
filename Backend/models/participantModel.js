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
    collection: 'Participants'  // Explicitly set collection name to match MongoDB
}); 

// Add pre-save middleware to log when a participant is being saved
participantSchema.pre('save', function(next) {
    console.log('Saving participant to collection:', this.collection.name);
    next();
});

const Participant = mongoose.model("Participant", participantSchema);

// Log when the model is created
console.log('Participant model created with collection name:', Participant.collection.name);

// Log the database connection and collections
mongoose.connection.on('connected', async () => {
    console.log('Mongoose connected to database:', mongoose.connection.db.databaseName);
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    // Log the number of documents in the Participants collection
    const count = await Participant.countDocuments();
    console.log('Number of participants in database:', count);
});

module.exports = Participant; 