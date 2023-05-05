import User from '../models/User.js'

const register = async (req, res) => {

    try {
        const user = await User.create(req.body)
        res.status(201).json({ user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Uh oh... There was an error" })
    }
}

const login = async (req, res) => {
    res.send("login user")
}

const updateUser = async (req, res) => {
    res.send("updateUser")
}

export { register, login, updateUser }