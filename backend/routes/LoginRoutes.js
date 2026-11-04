const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');

router.post('/login', LoginController.loginUser);
router.post('/logout', LoginController.logoutUser); 
router.get('/check-session', LoginController.checkSession);

module.exports = router;