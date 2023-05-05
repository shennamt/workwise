import mongoose from 'mongoose'
import validator from 'validator'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Please provide your name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required:[true, 'Please provide your email address'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        },
        unique: true,
    },
    password: {
        type: String,
        required:[true, 'Please provide a password'],
        minlength: 6,
    },
    location: {
        type: String,
        trim: true,
        maxlength: 25,
        default: 'Singapore',
    },
})

export default mongoose.model('User', UserSchema)