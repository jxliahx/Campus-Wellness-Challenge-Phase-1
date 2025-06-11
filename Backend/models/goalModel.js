const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'userModel'  // This allows us to reference multiple models
    },
    userModel: {
        type: String,
        required: true,
        enum: ['Participant', 'Coordinator']  // Specify which models can be referenced
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Goal', goalSchema)
