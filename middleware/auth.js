import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from '../errors/index.js'

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    // if doesnt start with bearer, then err
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnAuthenticatedError('Oops... Authentication Invalid')
    }
    // split the string and select the second value AKA token
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId }
        next() // if token exp or data is wrong then say 401
    } catch {
        throw new UnAuthenticatedError('Oops... Authentication Invalid')
    }
}

export default auth