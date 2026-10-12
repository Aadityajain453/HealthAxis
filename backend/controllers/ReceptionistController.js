const ReceptionistData = require('../models/ReceptionistSchema');
const SecurityData = require('../models/Login');
const bcrypt = require('bcrypt');

exports.getReceptionistRegData = async (req, res) => {

    try {

        console.log("Receptionist received data", req.body);

        const {
            firstname,
            lastname,
            email,
            mobile,
            gender,
            password
        } = req.body;

        if (!firstname || !lastname || !email || !mobile || !gender || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const handlePassword = await bcrypt.hash(password, 10);

        const utype = "receptionist";

        const existingUser = await SecurityData.findOne({ email });

        if (existingUser) {

            console.log("Receptionist registration failed");
            console.log("Reason : Email already exists");

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const ReceptionistRecord = new ReceptionistData({
            firstname,
            lastname,
            email,
            mobile,
            gender,
            role: utype
        });

        const Receptionist_Security_Record = new SecurityData({
            email,
            password: handlePassword,
            usertype: utype
        });

        const Receptionist_Record = await ReceptionistRecord.save();

        await Receptionist_Security_Record.save();

        console.log(
            "Receptionist registered successfully",
            Receptionist_Record
        );

        res.status(201).json({
            success: true,
            message: "Receptionist Registered"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong, try again"
        });
    }
};