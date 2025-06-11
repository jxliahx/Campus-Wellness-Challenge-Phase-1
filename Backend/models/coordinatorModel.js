const mongoose = require("mongoose");

const coordinatorSchema = new mongoose.Schema({
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
        enum: ['coordinator'],
        default: 'coordinator',
        required: true
    }
},
{
    timestamps: true,
    collection: 'Coordinators'  // Using correct capitalization
}); 

// Add pre-save middleware to log when a coordinator is being saved
coordinatorSchema.pre('save', function(next) {
    console.log('Saving coordinator to collection:', this.collection.name);
    next();
});

const Coordinator = mongoose.model("Coordinator", coordinatorSchema);

// Log when the model is created
console.log('Coordinator model created with collection name:', Coordinator.collection.name);

module.exports = Coordinator; 