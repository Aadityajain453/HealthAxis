
const bcrypt = require("bcrypt");
const SecurityData = require("../models/Login");
const Patient = require("../models/PatientSchema");

exports.loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate required fields
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        // Find user
        const user = await SecurityData.findOne({
            email: email
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Validate role
        if (user.usertype !== role) {
            return res.status(401).json({
                success: false,
                message: "Invalid role"
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Get patient ID if user is a patient
        let patientID = null;

        if (user.usertype === "patient") {
            const patient = await Patient.findOne({
                email: user.email
            });

            if (!patient) {
                return res.status(404).json({
                    success: false,
                    message: "Patient record not found"
                });
            }

            patientID = patient.patientID;
        }

        // Store user data in session
        req.session.user = {
            email: user.email,
            usertype: user.usertype,
            ...(patientID && { patientID })
        };

        // Save session before sending response
        req.session.save((err) => {
            if (err) {
                console.log("Session Save Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Session save failed"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Login successful",
                usertype: user.usertype,
                email: user.email,
                patientID: patientID
            });
        });

    } catch (error) {
        console.log("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
