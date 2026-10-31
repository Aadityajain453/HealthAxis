const DoctorData = require('../models/DoctorSchema');
const SecurityData = require('../models/Login');
const bcrypt = require('bcrypt');

exports.getDoctorRegData = async (req, res) => {
    try {

        console.log("Received Data :", req.body);

        const fn = req.body.firstname;
        const ln = req.body.lastname;
        const em = req.body.email;
        const mob = req.body.mobile;
        const gen = req.body.gender;
        const dep = req.body.department;
        const spec = req.body.specialization;
        const qual = req.body.qualification;
        const exp = req.body.experience;
        const consult = req.body.consultfee;
        const pass = req.body.password;



        const utype = "doctor";

        const existingUser = await DoctorData.findOne({ email: em });

        if (existingUser) {
            console.log("Doctor registration failed");
            console.log("Reason: Email already exists");
            console.log("Email:", em);
            res.status(400).json(
                {
                    message: "Email already exists"
                }
            );
            return;
        }

        const existingLoginUser = await SecurityData.findOne({ email: em });

        if (existingLoginUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const handlePassword = await bcrypt.hash(pass, 10);

        const DoctorRecord = new

            DoctorData({ firstname: fn, lastname: ln, email: em, mobile: mob, gender: gen, department: dep, specialization: spec, qualification: qual, experience: exp, consultation_fee: consult, role: utype });

        const DoctorSecurityRecord = new

            SecurityData({ email: em, password: handlePassword, usertype: utype });

        let result = await DoctorRecord.save();

        let result2 = await DoctorSecurityRecord.save();

        if (result) {
            console.log("Data saved successfully");
            res.status(201).json(
                {
                    message: "Doctor Registered",
                    success: true
                }
            )
            return;
        }


    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                success: false,
                message: "Something went wrong, try again"
            }
        )
    }
}

exports.sendDoctorData = async (req, res) => {
    try {
        const FindDoctorRecords = await DoctorData.find({ role: "doctor" });
        res.json(FindDoctorRecords);
        console.log(FindDoctorRecords);



    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                success: false,
                message: "Something went wrong, try again"
            }
        )
    }
}

exports.sendEditDoctorData = async (req, res) => {
    try {
        console.log("Received Email", req.params.eml);

        const em = req.params.eml;

        const SendRecordForEdit = await DoctorData.findOne({ email: em });

        console.log(SendRecordForEdit);
        res.json(SendRecordForEdit);



    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                success: false,
                message: "Something went wrong, try again"
            }
        )
    }
}

exports.updateDoctorData = async (req, res) => {
    try {
        console.log("Request For Update", req.params);
        console.log("Request For Update", req.body);

        const em = req.params.eml;
        const fn = req.body.firstname;
        const ln = req.body.lastname;
        const mob = req.body.mobile;
        const gen = req.body.gender;
        const dep = req.body.department;
        const spec = req.body.specialization;
        const qual = req.body.qualification;
        const exp = req.body.experience;
        const consult = req.body.consultfee;
        const st = req.body.status;

        const filter = { email: em };

        const UpdateData = { firstname: fn, lastname: ln, mobile: mob, gender: gen, department: dep, specialization: spec, qualification: qual, experience: exp, consultation_fee: consult, status: st };

        const SendUpdateRecord = await DoctorData.findOneAndUpdate(filter, UpdateData, { new: true });

        console.log("Updated Data", SendUpdateRecord);

        if (!SendUpdateRecord) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor Data Updated Successfully",
            data: SendUpdateRecord
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                success: false,
                message: "Something went wrong, try again"
            }
        )
    }
}

exports.getDeleteDoctor = async (req, res) => {
    try {
        console.log("Received Delete Data", req.body);

        const em = req.body.email;
        console.log(em);

        if (!em) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Doctor email is required"
                }
            )
        }

        const DeleteDoctorRecord = await DoctorData.findOneAndDelete({ email: em });


        console.log("Deleted Doctor:", DeleteDoctorRecord);


        if (!DeleteDoctorRecord) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            })
        }

        await SecurityData.findOneAndDelete({ email: em });

        return res.status(200).json({
            success: true,
            message: "Data deleted successfully"
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong, try again"
        })
    }
}

// GET LOGGED-IN DOCTOR PROFILE
exports.getMyDoctorProfile = async (req, res) => {
    try {
        // Check login session
        if (!req.session.user) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        // Only doctor can access this API
        if (req.session.user.usertype !== "doctor") {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        // Fetch doctor using logged-in email
        const doctor = await DoctorData.findOne({
            email: req.session.user.email,
            role: "doctor"
        }).select("-__v");

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor profile not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor profile fetched successfully",
            data: doctor
        });

    } catch (error) {
        console.log("Get Doctor Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


// UPDATE LOGGED-IN DOCTOR PROFILE
exports.updateMyDoctorProfile = async (req, res) => {
    try {
        // Check login session
        if (!req.session.user) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        // Only doctor can update own profile
        if (req.session.user.usertype !== "doctor") {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        const { firstname, lastname, mobile, gender, experience } = req.body;

        // Validate required fields
        if (!firstname?.trim() || !lastname?.trim() || !mobile || !gender ||
            experience === undefined || experience === null || experience === "") {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        // Validate names
        const namePattern = /^[a-zA-Z ]+$/;

        if (!namePattern.test(firstname.trim()) || !namePattern.test(lastname.trim())) {
            return res.status(400).json({
                success: false,
                message: "Names must contain only alphabets"
            });
        }

        // Validate mobile number
        if (!/^[6-9][0-9]{9}$/.test(mobile)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mobile number"
            });
        }

        // Validate gender
        if (!["Male", "Female"].includes(gender)) {
            return res.status(400).json({
                success: false,
                message: "Invalid gender"
            });
        }

        // Validate experience
        const experienceValue = Number(experience);

        if (!Number.isFinite(experienceValue) || experienceValue < 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid experience"
            });
        }

        // Update only allowed fields using session email
        const updatedDoctor = await DoctorData.findOneAndUpdate(
            {
                email: req.session.user.email,
                role: "doctor"
            },
            {
                $set: {
                    firstname: firstname.trim(),
                    lastname: lastname.trim(),
                    mobile,
                    gender,
                    experience: experienceValue
                }
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-__v");

        if (!updatedDoctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor profile not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor profile updated successfully",
            data: updatedDoctor
        });

    } catch (error) {
        console.log("Update Doctor Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};