const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');  // import controller functions

router.post('/register', register);  // route for user registration
router.post('/login', login);        // route for user login

module.exports = router;     // export router