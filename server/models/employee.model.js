const mongoose = require('mongoose')

module.exports = mongoose.model('Employee', {
    username: { type: String },
    password: { type: String },
    gender: { type: String }, 
    age: { type: Number },
})