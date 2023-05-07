import { UnAuthenticatedError } from '../errors/index.js'

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        throw new UnAuthenticatedError('Oops... Authentication Invalid')
    }
    next()
}

export default auth