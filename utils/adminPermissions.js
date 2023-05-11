import { UnAuthenticatedError } from '../errors/index.js'

const adminPermissions = (requestUser, resourceUserId) => {
	if (!requestUser.isAdmin) return
	throw new UnAuthenticatedError(
		'You are not authorised to access this route'
	)
}

export default adminPermissions
