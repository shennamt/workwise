import 'express-async-errors'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

const app = express()
dotenv.config()

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

// db and auth
import connectDB from './db/connect.js'

// routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
import adminRouter from './routes/adminRoutes.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

// logger middleware
// we only do this if node env is not production cos.. on netlify need something else
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, '.client/build')))
app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)
app.use('/api/v1/admin', authenticateUser, adminRouter)

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
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
