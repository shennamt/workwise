import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'

const app = express()
dotenv.config()

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

app.get('/', (req, res) => {
    res.send("The healthy server life chose YOU!")
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5001

// connectDB returns a promise so you need async await
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()