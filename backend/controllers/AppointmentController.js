const AppointmentData = require('../models/AppointmentSchema');

exports.createAppointment = async (req, res) => {
    try {
        console.log("Appointment Data :", req.body);

        const { patientID, doctorEmail, appointmentDate, appointmentTime, reason, createdBy } = req.body;

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

        const appointments = await AppointmentData.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Appointments fetched successfully",
            data: appointments
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


        // Find and update appointment
        const updatedAppointment = await AppointmentData.findOneAndUpdate(
            { appointmentID: appointmentID },
            { status: status },
            { returnDocument: true }
        );

        // Appointment not found
        if (!updatedAppointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        return res.status(200).json(
            {
                success: true,
                data: updatedAppointment
            }
        );


    } catch (error) {
        console.log("Update Appointment Status Error:", error);

        return res.status(500).json(
            {
                success: false,
                message: "Internal Server Error"
            }
        )
    }
}

exports.cancelAppointment = async (req, res) => {
    try {

        console.log("Cancel Appointment Data", req.body);

        const { appointmentID } = req.body;

        // Required field validation

        if (!appointmentID) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Appointment ID is required"
                }
            )
        }

        // Find Appointment

        const Appointment = await AppointmentData.findOne({ appointmentID: appointmentID });


        if (!Appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        // Update status
        Appointment.status = "Cancelled";

        await Appointment.save();

        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully",
            data: Appointment
        });

        
    } catch (error) {
        console.log("Cancel Appointment Error", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}