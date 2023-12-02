const mongoose = require('mongoose')

const Employee = mongoose.model('Employee', {
    first_name: {
      type: String,
      required:  true
    },
    last_name: {
      type: String,
      required: true
    },
    email: String,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    salary: Number
})

module.exports = Employee