import { UnAuthenticatedError } from '../errors/index.js'

const adminPermissions = (requestUser) => {
	if (requestUser && requestUser.isAdmin) {
		return
	} else {
		throw new UnAuthenticatedError(
			'You are not authorised to perform this action'
		)
	}
}

export default adminPermissions
