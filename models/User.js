import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

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

// pre-save hook executed before user object is saved to db
// triggered in authController using .create
// a hook that's called before saving doc
UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10); // salt is rando string of characters
    this.password = await bcrypt.hash(this.password, salt)
})


export default mongoose.model('User', UserSchema)