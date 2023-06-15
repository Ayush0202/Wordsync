const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const {Server} = require('socket.io')

const app = express()

dotenv.config()

const PORT = 5000 || process.env.PORT

const documentController = require('./controller/documentController')
const documentRoute= require('./routes/documentRoute')
const authRoute = require('./routes/authRoute')

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

// auth routes
app.use('/', authRoute)

const server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

const io = new Server(server, {
    cors: {
        origin: `${process.env.CLIENT_URL}`,
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {

    // making changes on a particular document only
    socket.on('get-document', async (documentId, userId) => {

        const document = await documentController.getDocument(documentId, userId)
        socket.join(documentId)
        socket.emit('load-document', document.data)

        // getting changes from frontend
        socket.on('send-changes', delta => {
            // sending data received to all users
            // backend to frontend
            socket.broadcast.to(documentId).emit('receive-changes', delta)
        })

        // updating document
        socket.on('save-document', async data => {
            await documentController.updateDocument(documentId, data)
        })
    })
})