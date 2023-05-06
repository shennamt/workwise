import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
        select: false,
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
    const salt = await bcrypt.genSalt(10); // salt is random string of characters
    this.password = await bcrypt.hash(this.password, salt)
})


// use mongoose custom instance .methods to create JWT
//set it up in user model but call it call it in the controller because its created there duh
// rn im returned the password which is not ideal
// trying to exclude the password in the res by setting an override at the query level
// AKA SchemaType.prototype.select()
UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId:this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME })
}

// {userId: this._id}
// access payload from server only with id. dont care about everything else

export default mongoose.model('User', UserSchema)