const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const documentRoute= require('./routes/documentRoute')

dotenv.config()

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// connecting database
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cx5ccid.mongodb.net/${process.env.DB_NAME}`, {
    useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err))

// document routes
app.use('/docs', documentRoute)

app.listen(5000 || process.env.PORT, () => {
    console.log('Server is running on port 5000')
})