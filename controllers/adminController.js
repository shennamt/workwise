import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import User from '../models/User.js'
import Job from '../models/Job.js'
import adminPermissions from '../utils/adminPermissions.js'

const getAllUsers = async (req, res) => {
	adminPermissions(req.user)
	const users = await User.find({}).select('-password')
	res.status(StatusCodes.OK).json({
		users,
		totalUsers: users.length,
		numOfPages: 1,
	})
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
	adminPermissions(req.user)
	await Job.deleteMany({ createdBy: userId })
	await otherUser.deleteOne()
	res.status(StatusCodes.OK).json({ msg: 'Success! User removed...' })
}

export { getAllUsers, deleteUser }
