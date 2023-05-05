import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err, req, res, next)  => {
    console.log(err.message)
    // using built in js err constructor, check MDN
    // accepts msg as argument
    
    const defaultError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: "Oops, something went wrong... try again later",
    }
    if (err.name === 'ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        // defaultError.msg = err.message
        defaultError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
    }
    if (err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = `The ${Object.keys(err.keyValue)} field is not unqiue`
    }
    // res.status(defaultError.statusCode).json({ msg: err })
    res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware