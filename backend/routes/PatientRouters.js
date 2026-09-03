const express = require("express");
const router = express.Router();
const PatientController = require("../controllers/patientController");


router.post('/patientreg',PatientController.getPatientRegData);
router.post('/fetchpatients', PatientController.fetchPatientsData);
router.post('/fetchpatientdetails', PatientController.fetchPatientsAllDetails);
router.get('/fetchpatientforedit/:ptId', PatientController.sendDataForEdit);
router.put('/UpdatePatientData', PatientController.UpdatePatientData);

module.exports = router;