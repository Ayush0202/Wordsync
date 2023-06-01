const express = require('express')
const router = express.Router()

const documentController = require('../controller/documentController')

// getting all documents in a dashboard
router.get('/dashboard', documentController.getAllDocuments)

module.exports = router