const PatientData = require("../models/PatientSchema");
const SecurityData = require("../models/Login");
const bcrypt = require("bcrypt");



// get Patient registration data 



exports.getPatientRegData = async (req, res) => {
    try {
        console.log("Received Data is :", req.body);
        const { firstname, lastname, email, mobile, dob, gender, bloodgroup, address, city, state, pincode, password } = req.body;

        const handlePassword = await bcrypt.hash(password, 10);

        const utype = "patient";

        const existingUser = await SecurityData.findOne({ email });

        if (existingUser) {
            res.status(400).json(
                {
                    message: "Email already exists"
                }
            );
            return
        }

        const lastPatient = await PatientData.findOne().sort({ createdAt: -1 });

        let patientID;

        if (!lastPatient) {
            patientID = "PAT1001";
        } else {
            const lastID = parseInt(lastPatient.patientID.replace("PAT", ""));
            patientID = `PAT${lastID + 1}`;
        }


        const PatientRecord = new PatientData({ patientID, firstname, lastname, email, mobile, dob, gender, bloodgroup, address, city, state, pincode })

        const PatientSecurityRecord = new SecurityData({ email, password: handlePassword, usertype: utype });

        let newrecord = await PatientRecord.save();

        let srecord = await PatientSecurityRecord.save();

        console.log("Data after saving Patient", newrecord);

        if (newrecord) {
            res.status(201).json(
                {
                    message: "Patient registered successfully",
                    success: true,
                    patientId: patientID
                }
            );
            return
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

exports.fetchPatientsData = async (req, res) => {
    try {

        const FindPatientRecords = await PatientData.find();
        console.log("Find Patient Records", FindPatientRecords);

        res.json(FindPatientRecords);

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

exports.fetchPatientsAllDetails = async (req, res) => {
    try {
        // Check whether user is logged in
        if (!req.session.user) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        // Only patients can access this API
        if (req.session.user.usertype !== "patient") {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        // Get logged-in patient's ID from session
        const ptID = req.session.user.patientID;

        if (!ptID) {
            return res.status(404).json({
                success: false,
                message: "Patient ID not found in session"
            });
        }

        // Fetch only the logged-in patient's record
        const patient = await PatientData.findOne({
            patientID: ptID
        });

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient record not found"
            });
        }

        return res.status(200).json(patient);

    } catch (error) {
        console.log("Patient Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


exports.sendDataForEdit = async (req, res) => {
    try {
        console.log("Received ptid for edit", req.params);

        const ptId = req.params.ptId;

        const SendRecord = await PatientData.findOne({ patientID: ptId });

        console.log("Finded Record", SendRecord);
        res.json(SendRecord);

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



exports.UpdatePatientData = async (req, res) => {
    try {
        // 1. Check login session
        if (!req.session.user) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        // 2. Allow only patient role
        if (req.session.user.usertype !== "patient") {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        // 3. Get patient ID from verified session
        const ptID = req.session.user.patientID;

        if (!ptID) {
            return res.status(404).json({
                success: false,
                message: "Patient ID not found in session"
            });
        }

        const {
            firstname,
            lastname,
            mobile,
            gender,
            address,
            pincode,
            dob,
            bloodgroup,
            city,
            state
        } = req.body;

        // 4. Validate required fields
        if (
            !firstname?.trim() ||
            !lastname?.trim() ||
            !mobile ||
            !gender ||
            !address?.trim() ||
            !pincode ||
            !dob ||
            !bloodgroup ||
            !city?.trim() ||
            !state?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields are required"
            });
        }

        // 5. Update only the logged-in patient's record
        const UpdatedRecord = await PatientData.findOneAndUpdate(
            { patientID: ptID },
            {
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                mobile,
                gender,
                address: address.trim(),
                pincode,
                dob,
                bloodgroup,
                city: city.trim(),
                state: state.trim()
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!UpdatedRecord) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Patient profile updated successfully",
            data: UpdatedRecord
        });

    } catch (error) {
        console.log("Update Patient Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again"
        });
    }
};


exports.patientDeleteAPI = async (req, res) => {
    try {
        console.log("ComingDeleteData", req.body);

        const PtId = req.body.patientID;

        if (!PtId) {
            return res.status(400).json({
                success: false,
                message: "Patient ID is required"
            });
        }

        const DeleteRecord = await PatientData.findOneAndDelete({ patientID: PtId });

        console.log("Record after delete", DeleteRecord);

        if (!DeleteRecord) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Patient not found"
                }
            )
        }

        await SecurityData.findOneAndDelete({ email: DeleteRecord.email });

        return res.status(200).json(
            {
                success: true,
                message: "Patient deleted successfully"
            }
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: "Something went wrong, try again"
            }
        )
    }
}


exports.searchPatientsData = async (req, res) => {
    try {

        console.log("Search Data:", req.body);

        const search = req.body.search.trim();

        console.log("Search Value:", `"${search}"`);

        if (!search) {
            return res.status(400).json({
                success: false,
                message: "Search value is required"
            });
        }

        // Convert search value into regex-safe text
        const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const SearchRecords = await PatientData.aggregate([
            {
                $match: {
                    $or: [
                        { patientID: { $regex: safeSearch, $options: "i" } },
                        { firstname: { $regex: safeSearch, $options: "i" } },
                        { lastname: { $regex: safeSearch, $options: "i" } },
                        {
                            $expr: {
                                $regexMatch: {
                                    input: {
                                        $concat: ["$firstname", " ", "$lastname"]
                                    },
                                    regex: safeSearch,
                                    options: "i"
                                }
                            }
                        },
                        { email: { $regex: safeSearch, $options: "i" } },
                        { mobile: { $regex: safeSearch, $options: "i" } },
                        { gender: { $regex: safeSearch, $options: "i" } },
                        { bloodgroup: { $regex: safeSearch, $options: "i" } },
                        { city: { $regex: safeSearch, $options: "i" } }
                    ]
                }
            }
        ]);

        console.log("Search Results:", SearchRecords);

        return res.status(200).json({
            success: true,
            data: SearchRecords
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again"
        });
    }
};