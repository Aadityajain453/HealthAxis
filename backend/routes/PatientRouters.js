const express = require("express");
const router = express.Router();
const PatientController = require("../controllers/patientController");


router.post('/patientreg', PatientController.getPatientRegData);
router.post('/fetchpatients', PatientController.fetchPatientsData);
router.post('/fetchpatientdetails', PatientController.fetchPatientsAllDetails);
router.post('/searchpatients', PatientController.searchPatientsData);
router.get('/fetchpatientforedit/:ptId', PatientController.sendDataForEdit);
router.put('/UpdatePatientData', PatientController.UpdatePatientData);
router.delete('/deletePatient', PatientController.patientDeleteAPI);

module.exports = router;