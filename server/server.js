const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const {Server} = require('socket.io')

const app = express()

dotenv.config()

const PORT = 5000 || process.env.PORT

const documentRoute= require('./routes/documentRoute')

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// connecting database
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cx5ccid.mongodb.net/${process.env.DB_NAME}`, {
    useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err))

// document routes
app.use('/docs', documentRoute)

const server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {

    // making changes on a particular document only
    socket.on('get-document', documentId => {

        const data = ""
        socket.join(documentId)
        socket.emit('load-document', data)

        // getting changes from frontend
        socket.on('send-changes', delta => {
            // sending data received to all users
            // backend to frontend
            socket.broadcast.to(documentId).emit('receive-changes', delta)
        })
    })




})