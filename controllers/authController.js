import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'

// custom error class that extends built in error class
// constructor takes msg param and pass to parent err class constructor using super()
// thereby setting msg property of err to passed val
// custom class also adds statuscode.
// this class throws errs with specific http stat codes.

class CustomAPIError extends Error {
    constructor(message) {
        super(message)
    }
}

class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body
    
    if (!name || !email || !password) {
        throw new BadRequestError("Did you miss an input?")
    }

    const user = await User.create({ name, email, password })
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.send("login user")
}

const updateUser = async (req, res) => {
    res.send("updateUser")
}

export { register, login, updateUser }