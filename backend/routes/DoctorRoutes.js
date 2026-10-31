const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/DoctorController');


router.post('/registerdoctor', DoctorController.getDoctorRegData);
router.post('/showdoctors', DoctorController.sendDoctorData);
router.get('/fetchDoctorData/:eml', DoctorController.sendEditDoctorData);
router.put('/updateDoctorData/:eml', DoctorController.updateDoctorData);
router.delete('/deleteDoctorData', DoctorController.getDeleteDoctor);
router.get('/my-profile', DoctorController.getMyDoctorProfile);
router.put('/update-my-profile', DoctorController.updateMyDoctorProfile);

module.exports = router;