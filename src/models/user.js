const mongoose  = require('mongoose');
const validator = require('validator')


const User = mongoose.model('User', {
    name: {
        type: String, 
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length < 6) {
                throw new Error('Password must be at least 6 characters long')
            }
            if(value.includes('password')) {
                throw new Error('Your password is weak... as you')
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number')
            }
        }

    }
    
})

module.exports = User;