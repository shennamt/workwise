import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('The healthy server life chose YOU!')
})

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log(`Server is listening on ${port}...`)
})