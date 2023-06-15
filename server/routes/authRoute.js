const express = require('express')
const router = express.Router()

const authController = require('./../controller/authController')
const authRequire = require('../middleware/requireAuth')

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.delete('/delete', authRequire, authController.deleteUser)

module.exports = router