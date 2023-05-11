import express from 'express'
import { register, login, updateUser } from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticateUser, updateUser)
router
	.route('/admin/users')
	.get(authenticateUser, getAllUsers)
	.delete(authenticateUser, deleteUser)

export default router
