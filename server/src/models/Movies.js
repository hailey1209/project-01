const mongoose = require('mongoose')

const { Schema } = mongoose
const { Types: { ObjectId } } = Schema

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        trim: true,
    },
    poster_img: {
        type: String,
        trim: true,
    },
    relrease_date: {
        type: Date,
        required: true,
    },
    video: {
        type: String,
        trim: true,
    },
    added_on: {
        type: Date,
        default: Date.now(),
    },
    last_updated: {
        type: Date,
        default: Date.now()
    }
})

const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie