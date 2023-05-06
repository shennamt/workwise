import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'

const register = async (req, res) => {
    const { name, email, password } = req.body
    
    if (!name || !email || !password) {
        throw new BadRequestError("Did you miss an input?")
    }

    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
        throw new BadRequestError("Email already in use")
    }

    // oh but i use User create so i still get the password aiya
    // maybe create a utils folder to create function to get specific values
    // or... hardcode hahah chicken backside
    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    res.status(StatusCodes.OK)
    .json({
        user: {
            email:user.email,
            location:user.location,
            name:user.name
        },
        token,
        location: user.location
    })
}

const login = async (req, res) => {
    res.send("login user")
}
// use err handler
// check for user using email/ password
// set up an unauth.js in errors folder
// import/export in index.js
// get statuscodes and customapis, then change to unauth

const updateUser = async (req, res) => {
    res.send("updateUser")
}

export { register, login, updateUser }