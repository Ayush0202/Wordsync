const express = require('express')
const router = express.Router()

const documentController = require('../controller/documentController')
const requireAuth = require('../middleware/requireAuth')

// getting all documents in a dashboard
router.get('/dashboard', requireAuth, documentController.getAllDocuments)
router.delete('/:id', requireAuth, documentController.deleteDocument)

module.exports = router