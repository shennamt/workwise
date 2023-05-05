import mongoose from 'mongoose'

const UserSchema = new mongoose.SchemaType({
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
        unique: true,
    },
    password: {
        type: String,
        required:[true, 'Please provide a password'],
        minlength: 6,
    },
    password: {
        type: String,
        required:[true, 'Please provide a password'],
        minlength: 6,
    },
    location: {
        type: String,
        trim: true,
        minlength: 20,
        default: 'Singapore',
    },
})

export default mongoose.model('User', UserSchema)