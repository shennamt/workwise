import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import {
	BadRequestError,
	NotFoundError,
	UnAuthenticatedError,
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'

const createJob = async (req, res) => {
	const { position, company } = req.body
	if (!position || !company) {
		throw new BadRequestError('Please provide all values')
	}
	req.body.createdBy = req.user.userId
	const job = await Job.create(req.body)
	res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
	const { status, jobType, jobStyle, sort, search } = req.query
	const queryObject = {
		createdBy: req.user.userId,
	}

	if (status !== 'all') {
		queryObject.status = status
	}

	if (jobType !== 'all') {
		queryObject.jobType = jobType
	}

	if (jobStyle !== 'all') {
		queryObject.jobStyle = jobStyle
	}

	if (search) {
		queryObject.position = { $regex: search, $options: 'i' }
	}

	let result = Job.find(queryObject)

	if (sort === 'Recently Created') {
		result = result.sort('-createdAt')
	}

	if (sort === 'Least Recent') {
		result = result.sort('createdAt')
	}

	if (sort === 'Recently Updated') {
		result = result.sort('-updatedAt')
	}

	if (sort === 'A - Z') {
		result = result.sort('position')
	}

	if (sort === 'Z - A') {
		result = result.sort('-position')
	}

	const jobs = await result

	res.status(StatusCodes.OK).json({
		jobs,
		totalJobs: jobs.length,
		numOfPages: 1,
	})
}

const updateJob = async (req, res) => {
	const { id: jobId } = req.params
	const { company, position } = req.body
	if (!position || !company) {
		throw new BadRequestError('Please provide all values')
	}

	const job = await Job.findOne({ _id: jobId })
	if (!job) {
		throw new NotFoundError(`No job with id :${jobId}`)
	}

	checkPermissions(req.user, job.createdBy)

	const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
		new: true,
		runValidators: true,
	})
	res.status(StatusCodes.OK).json({ updatedJob })
}

const deleteJob = async (req, res) => {
	const { id: jobId } = req.params
	const job = await Job.findOne({ _id: jobId })
	if (!job) {
		throw new NotFoundError(`No job with id :${jobId}`)
	}
	checkPermissions(req.user, job.createdBy)
	await job.deleteOne()
	// prev i used await job.remove() but mongoose has an error i think
	res.status(StatusCodes.OK).json({ msg: 'Success! Job removed...' })
}

const showStats = async (req, res) => {
	let stats = await Job.aggregate([
		// in mongoose 7, need the "new" lol. was getting err in postman
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
		{ $group: { _id: '$status', count: { $sum: 1 } } },
	])
	stats = stats.reduce((acc, curr) => {
		const { _id: title, count } = curr
		acc[title] = count
		return acc
	}, {})

	const defaultStats = {
		pending: stats.pending || 0,
		interview: stats.interview || 0,
		declined: stats.declined || 0,
	}

	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
		{
			$group: {
				_id: {
					year: { $year: '$createdAt' },
					month: { $month: '$createdAt' },
				},
				count: { $sum: 1 },
			},
		},
		{ $sort: { '_id.year': -1, '_id.month': -1 } },
		{ $limit: 6 },
	])
	monthlyApplications = monthlyApplications
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item
			const date = moment()
				.month(month - 1) // minus 1 because in moment, it counts from months 0-11. but mongo counts 12
				.year(year)
				.format('MMM Y')
			return { date, count }
		})
		.reverse() // latest 12 months

	res.status(StatusCodes.OK).json({
		defaultStats,
		monthlyApplications,
	})
}

export { createJob, getAllJobs, updateJob, deleteJob, showStats }
