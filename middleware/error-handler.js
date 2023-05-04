const errorHandlerMiddleware = (err, req, res, next)  => {
    console.log(err)
    res.status(500).json({ msg: "Oops... There was an error" })
}

export default errorHandlerMiddleware