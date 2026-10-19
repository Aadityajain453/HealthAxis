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

exports.showReceptionists = async (req, res) => {

    try {

        const ReceptionistRecords = await ReceptionistData.find({
            role: "receptionist"
        });

        res.json(ReceptionistRecords);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong, try again"
        });
    }
};

exports.sendEditReceptionistData = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const ReceptionistRecord = await ReceptionistData.findOne({
            email: email,
            role: "receptionist"
        });

        if (!ReceptionistRecord) {
            return res.status(404).json({
                success: false,
                message: "Receptionist not found"
            });
        }

        res.json({
            success: true,
            data: ReceptionistRecord
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong, try again"
        });
    }
};

exports.updateReceptionistData = async (req, res) => {
    try {

        const { firstname, lastname, email, mobile, gender, status } = req.body;

        if (!email || !firstname || !lastname || !mobile || !gender || !status) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const updateReceptionistRecord = await ReceptionistData.findOneAndUpdate(
            { email: email, role: "receptionist" },
            { firstname, lastname, mobile, gender, status },
            { returnDocument: "after", runValidators: true }
        );

        if (!updateReceptionistRecord) {
            return res.status(404).json({
                success: false,
                message: "Receptionist not found"
            });
        }

        return res.json({
            success: true,
            message: "Receptionist updated successfully",
            data: updateReceptionistRecord
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong, try again"
        });
    }
}

exports.DeleteReceptionistData = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const findReceptionistRecord = await ReceptionistData.findOne({ email: email, role: "receptionist" });

        if (!findReceptionistRecord) {
            return res.status(404).json({
                success: false,
                message: "Receptionist not found"
            });
        }

        await ReceptionistData.deleteOne({ email: email, role: "receptionist" });

        await SecurityData.deleteOne({ email: email, usertype: "receptionist" });

        return res.status(200).json({
            success: true,
            message: "Receptionist deleted successfully",

        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again"
        });
    }
};