// import { UnAuthenticatedError } from '../errors/index.js'

// const adminPermissions = (requestUser) => {
// 	if (requestUser.isAdmin) return
// 	throw new UnAuthenticatedError(
// 		'You are not authorised to perform this action'
// 	)
// }

// export default adminPermissions

import { UnAuthenticatedError } from '../errors/index.js'

const adminPermissions = (requestUser) => {
	console.log(requestUser)
	console.log('isAdmin', requestUser.isAdmin)
	// Check if the requestUser exists and has an isAdmin property
	if (requestUser && requestUser.isAdmin) {
		// If the user is an admin, return true
		return true
	} else {
		// If the user is not an admin, throw an error
		throw new UnAuthenticatedError(
			'You are not authorised to perform this action'
		)
	}
}

export default adminPermissions
