const express = require("express");
const router = express.Router();
const PatientController = require("../controllers/patientController");


router.post('/patientreg',PatientController.getPatientRegData);

module.exports = router;