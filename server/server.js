const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello from Server')
})

app.listen(5000 || process.env.PORT, () => {
    console.log('Server is running on port 5000')
})