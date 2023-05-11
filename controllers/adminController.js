import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import User from '../models/User.js'
import adminPermissions from '../utils/adminPermissions.js'

const getAllUsers = async (req, res) => {
	console.log('Logged-in user isAdmin:', req.user.isAdmin)
	const users = await User.find({}).select('-password')
	res.status(StatusCodes.OK).json({ users })
}

const deleteUser = async (req, res) => {
	const { id: userId } = req.params
	const otherUser = await User.findOne({ _id: userId })

	if (!otherUser) {
		throw new NotFoundError(`No user with id: ${userId}`)
	}

	if (otherUser.isAdmin) {
		throw new BadRequestError('Admin accounts cannot be deleted')
	}

	await otherUser.deleteOne()
	res.status(StatusCodes.OK).json({ msg: 'Success! User removed...' })
}

export { getAllUsers, deleteUser }
