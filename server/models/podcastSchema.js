const mongoose = require('mongoose')

const podcastSchema = mongoose.Schema({
    frontImage: {
        type: String,
        required: true
    },
    audioFile: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {timestamps: true})

const Podcast = mongoose.model('Podcast', podcastSchema)

module.exports = Podcast