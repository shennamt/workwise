import express from 'express'
import {
	createJob,
	getAllJobs,
	updateJob,
	deleteJob,
	showStats,
} from '../controllers/jobsController.js'

const router = express.Router()

// routes
router.route('/').post(createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router
