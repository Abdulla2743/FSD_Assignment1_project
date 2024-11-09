const express = require('express');
const { register, login, logout } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login',auth, login);
router.post('/logout', logout);

module.exports = router;
