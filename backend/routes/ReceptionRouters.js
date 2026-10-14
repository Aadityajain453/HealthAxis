const express = require('express');
const router = express.Router();
const ReceptionistController = require('../controllers/ReceptionistController');

router.post('/registerreceptionist', ReceptionistController.getReceptionistRegData);
router.post('/showreceptionists', ReceptionistController.showReceptionists);
router.post('/fetcheditreceptionist', ReceptionistController.sendEditReceptionistData);
router.put('/updatereceptionist', ReceptionistController.updateReceptionistData);

module.exports = router;