const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getAllUser } = require('../controllers/userController')

router.post('/api/register', registerUser)
router.post('/api/login', loginUser)
router.get('/api/golekuwong', getAllUser)


module.exports = router