const AppointmentData = require('../models/AppointmentSchema');
const PatientData = require('../models/PatientSchema');

exports.createAppointment = async (req, res) => {
    try {
        console.log("Appointment Data :", req.body);

        const { doctorEmail, appointmentDate, appointmentTime, reason, createdBy } = req.body;

        const patientID = req.session.user?.patientID;

        if (!req.session.user || req.session.user.usertype !== "patient" || !patientID) {
            return res.status(401).json({
                success: false,
                message: "Please login as a patient"
            });
        }

        if (!patientID || !doctorEmail || !appointmentDate || !appointmentTime || !reason || !createdBy) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        // Generate Appointment ID

        const lastAppointment = await AppointmentData.findOne().sort({ createdAt: -1 });

        let appointmentID = "APT1001";

        if (lastAppointment) {
            const lastNumber = parseInt(lastAppointment.appointmentID.replace("APT", ""));

            appointmentID = "APT" + (lastNumber + 1);
        }

        // Create appointment

        const appointment = new AppointmentData({
            appointmentID,
            patientID,
            doctorEmail,
            appointmentDate,
            appointmentTime,
            reason,
            createdBy,
            status: "Pending"
        });

        await appointment.save();


        return res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            data: appointment
        });


    } catch (error) {
        console.log("Create Appointment Error:", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


exports.showAppointments = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        const { usertype, email, patientID } = req.session.user;
        let appointments;

        if (usertype === "patient") {
            if (!patientID) {
                return res.status(401).json({
                    success: false,
                    message: "Patient ID not found in session"
                });
            }

            appointments = await AppointmentData.find({
                patientID: patientID
            }).sort({ createdAt: -1 });

        } else if (usertype === "doctor") {
            appointments = await AppointmentData.find({
                doctorEmail: email
            }).sort({ createdAt: -1 });

        } else if (["admin", "receptionist"].includes(usertype)) {
            appointments = await AppointmentData.find()
                .sort({ createdAt: -1 });

        } else {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view appointments"
            });
        }

        // Fetch patient details for each appointment
        const appointmentsWithPatient = await Promise.all(
            appointments.map(async (appointment) => {
                const patient = await PatientData.findOne({
                    patientID: appointment.patientID
                }).select("firstname lastname email mobile");

                return {
                    ...appointment.toObject(),
                    patient: patient
                        ? {
                            firstname: patient.firstname,
                            lastname: patient.lastname,
                            email: patient.email,
                            mobile: patient.mobile
                        }
                        : null
                };
            })
        );

        return res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            data: appointmentsWithPatient
        });

    } catch (error) {
        console.log("Show Appointments Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


exports.updateAppointmentStatus = async (req, res) => {
    try {
        console.log("Update Appointment Data :", req.body);

        const { appointmentID, status } = req.body;

        // Check login
        if (!req.session.user) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        // Only doctor and admin can update appointment status
        if (!["doctor", "admin"].includes(req.session.user.usertype)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update appointment status"
            });
        }

        // Required fields validation
        if (!appointmentID || !status) {
            return res.status(400).json({
                success: false,
                message: "Appointment ID and status are required"
            });
        }

        // Check valid status
        const validStatus = [
            "Pending",
            "Confirmed",
            "Completed",
            "Cancelled"
        ];

        if (!validStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment status"
            });
        }

        // Find appointment before updating
        const appointment = await AppointmentData.findOne({
            appointmentID: appointmentID
        });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        // Doctor can update only their own appointments
        if (
            req.session.user.usertype === "doctor" &&
            appointment.doctorEmail !== req.session.user.email
        ) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own appointments"
            });
        }

        // Update appointment status
        appointment.status = status;
        await appointment.save();

        return res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            data: appointment
        });

    } catch (error) {
        console.log("Update Appointment Status Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



exports.cancelAppointment = async (req, res) => {
    try {
        console.log("Cancel Appointment Data", req.body);

        const { appointmentID } = req.body;

        // Check login
        if (!req.session.user) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        // Required field validation
        if (!appointmentID) {
            return res.status(400).json({
                success: false,
                message: "Appointment ID is required"
            });
        }

        // Find appointment
        const appointment = await AppointmentData.findOne({
            appointmentID: appointmentID
        });

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        const usertype = req.session.user.usertype;

        // Only patient, doctor and admin can cancel
        if (!["patient", "doctor", "admin"].includes(usertype)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to cancel appointments"
            });
        }

        // Patient can cancel only their own appointment
        if (
            usertype === "patient" &&
            String(appointment.patientID) !== String(req.session.user.patientID)
        ) {
            return res.status(403).json({
                success: false,
                message: "You cannot cancel another patient's appointment"
            });
        }

        // Doctor can cancel only their own appointments
        if (
            usertype === "doctor" &&
            appointment.doctorEmail !== req.session.user.email
        ) {
            return res.status(403).json({
                success: false,
                message: "You can only cancel your own appointments"
            });
        }

        // Prevent cancelling completed appointments
        if (appointment.status === "Completed") {
            return res.status(400).json({
                success: false,
                message: "Completed appointments cannot be cancelled"
            });
        }

        // Update status
        appointment.status = "Cancelled";
        await appointment.save();

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully",
            data: appointment
        });

    } catch (error) {
        console.log("Cancel Appointment Error", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
