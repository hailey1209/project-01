const express = require('express')
const { default: mongoose } = require('mongoose')
const { Schema } = mongoose
const userSchema = new Schema({
    name: {
        type: String,
        trquired: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    created_on: {
        type: Date,
        default: Date.now(),
    },
    last_update: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User