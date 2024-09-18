const express = require('express');
const { register, login } = require('../controllers/authController');
const { emailValidator, passwordValidator } = require('../validations/Validations');
const router = express.Router();

router.post('/register', emailValidator,passwordValidator,register);
router.post('/login', emailValidator,login);

module.exports = router;
