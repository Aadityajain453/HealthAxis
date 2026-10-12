const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
    {
        appointmentID: {
            type: String,
            unique: true,
            required: true
        },

        patientID: {
            type: String,
            required: true
        },

        doctorEmail: {
            type: String,
            required: true
        },

        appointmentDate: {
            type: Date,
            required: true
        },

        appointmentTime: {
            type: String,
            required: true
        },

        reason: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
            default: "Pending"
        },

        createdBy: {
            type: String,
            enum: ["Patient", "Receptionist"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("AppointmentData", AppointmentSchema);