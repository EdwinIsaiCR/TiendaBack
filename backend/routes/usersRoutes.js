const express = require('express')
const router = express.Router()
const {registrarUser, loginUser, misDatos} = require('../controllers/usersController')
const {protect} = require('../middleware/authMiddleware')

router.post('/',registrarUser)
router.post('/login',loginUser)
router.get('/data', protect, misDatos)

module.exports = router