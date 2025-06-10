const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

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
    collection: 'Participants'  // Updated capitalization
}); 

// Add pre-save middleware to log when a user is being saved
userSchema.pre('save', function(next) {
    console.log('Saving user to collection:', this.collection.name);
    next();
});

const User = mongoose.model("User", userSchema);

// Log when the model is created
console.log('User model created with collection name:', User.collection.name);

module.exports = User;