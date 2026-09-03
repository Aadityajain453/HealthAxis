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
                Error: "Something went wrong try again"
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
                Error: "Something went wrong try again"
            }
        )
    }
}

exports.fetchPatientsAllDetails = async (req, res) => {
    try {

        console.log("Received PatientID", req.body.ptId);
        const ptID = req.body.ptId
        const FindSinglePatientRecord = await PatientData.findOne({ patientID: ptID });

        console.log("Patient Full Details", FindSinglePatientRecord);
        res.json(FindSinglePatientRecord);

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                Error: "Something went wrong try again"
            }
        )
    }
}


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
                Error: "Something went wrong try again"
            }
        )
    }
}


exports.UpdatePatientData = async (req, res) => {
    try {

        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log("Received Patient Data For Update :", req.body);

        const {
            firstname,
            lastname,
            email,
            mobile,
            gender,
            address,
            pincode,
            dob,
            bloodgroup,
            city,
            state,
            ptId
        } = req.body;

        if (
            !firstname ||
            !lastname ||
            !mobile ||
            !gender ||
            !address ||
            !pincode ||
            !dob ||
            !bloodgroup ||
            !city ||
            !state ||
            !ptId
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields are required"
            });
        }

        const filter = {
            patientID: ptId
        };

        const Update = {
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
        };

        const UpdatedRecord = await PatientData.findOneAndUpdate(
            filter,
            Update,
            { new: true }
        );

        if (!UpdatedRecord) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Patient data updated successfully",
            data: UpdatedRecord
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again"
        });
    }
};