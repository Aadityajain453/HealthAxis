const express = require("express");
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');


router.post('/createAppointment', AppointmentController.createAppointment);
router.post('/showAppointments', AppointmentController.showAppointments);
router.put('/updateAppointmentStatus',AppointmentController.updateAppointmentStatus);
router.put('/cancelAppointment', AppointmentController.cancelAppointment);

module.exports = router;