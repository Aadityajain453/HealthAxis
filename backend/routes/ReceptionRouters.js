const express = require('express');
const router = express.Router();
const ReceptionistController = require('../controllers/ReceptionistController');

router.post('/registerreceptionist', ReceptionistController.getReceptionistRegData);

module.exports = router;