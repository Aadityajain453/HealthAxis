const AdminData = require('../models/AdminSchema');
const SecurityData = require('../models/Login');
const bcrypt = require('bcrypt');


// get AdminRegistration Data 

exports.getAdminRegData = async (req, res) => {
    try {


        const { firstName, lastName, email, mobile, gender, password } = req.body;

        const handlePassword = await bcrypt.hash(password, 10);

        const utype = "admin";

        const existingUser = await SecurityData.findOne({ email });

        if (existingUser) {

            console.log("Admin registration failed");
            console.log("Reason: Email already exists");
            console.log("Email:", email);
            res.status(400).json(
                {
                    message: "Email already exists"
                }
            );
            return;
        }


        const AdminRecord = new AdminData({ firstName, lastName, email, mobile, gender, role: utype })

        const AdminSecurityRecord = new SecurityData({ email, password: handlePassword, usertype: utype });

        let adminNewRecord = await AdminRecord.save();

        let adminSRecord = await AdminSecurityRecord.save();

        console.log("Admin registered successfully", adminNewRecord);
        console.log(adminSRecord);

        if (adminNewRecord) {

            res.status(201).json(
                {
                    message: "Admin registered successfully",
                    success: true
                }
            )
            return;
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

exports.sendAdminData = async (req, res) => {
    try {
        const AdminRecord = await AdminData.find({ role: "admin" });

        console.log(AdminRecord);

        if (AdminRecord) {
            res.status(200).json(
                {
                    success: true,
                    data: AdminRecord
                }
            )
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

exports.sendSuperAdminData = async (req, res) => {
    try {
        const SuperAdminRecord = await AdminData.findOne({ role: "superadmin" });
        console.log(SuperAdminRecord);

        if (SuperAdminRecord) {
            res.status(200).json(
                {
                    success: true,
                    data: SuperAdminRecord
                }
            )
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

exports.sendEditAdminData = async (req, res) => {
    try {
        console.log(req.params.eml);

        const em = req.params.eml;

        const FindRecord = await AdminData.findOne({ email: em });

        console.log(FindRecord);
        res.json(FindRecord);

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                Error: "Something went wrong try again"
            }
        )
    }

}

exports.getUpdatedData = async (req, res) => {
    try {
        // console.log("Received Updated",req.body);

        const firstName = req.body.firstName.trim();
        const lastName = req.body.lastName.trim();
        const mobile = req.body.mobile.trim();
        const gender = req.body.gender;
        const email = req.body.email;

        const filter = { email };
        const update = { firstName, lastName, mobile, gender };

        const UpdatedRecord = await AdminData.findOneAndUpdate(filter, update, { new: true });

        console.log("Received Updated", UpdatedRecord);

        if (!UpdatedRecord) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admin updated successfully"
        });


    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                Error: "Something went wrong try again"
            }
        )
    }
}
exports.getDeleteAdmin = async (req, res) => {
    try {
        console.log("Received Data", req.body);

        const eml = req.body.email;

        const RecordDelete = await AdminData.findOneAndDelete({ email: eml });

        console.log(RecordDelete);

        if (!RecordDelete) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        await SecurityData.findOneAndDelete({ email: eml });

        return res.status(200).json({
            success: true,
            message: "Data deleted successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong try again"
        });
    }
};


exports.findSuperAdmin = async (req, res) => {
    try {
        const em = req.params.eml;
        console.log(em)
        const FindSuperAdmin = await AdminData.findOne({ email: em });

        console.log(FindSuperAdmin);

        res.json(FindSuperAdmin);

    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                Error: "Something went wrong try again"
            }
        )
    }
}

exports.UpdateSuperAdminProfile = async (req, res) => {
    try {


        const firstname = req.body.firstName.trim();
        const lastname = req.body.lastName.trim();
        const mob = req.body.mobile.trim();
        const eml = req.body.email;
        const role = req.body.role;
        const gender = req.body.gender;

        const filter = { email: eml, role: role };

        const update = { firstName: firstname, lastName: lastname, mobile: mob, gender: gender };

        const SuperAdminUpdate = await AdminData.findOneAndUpdate(filter, update, { returnDocument: "before" });

        console.log("After Update", SuperAdminUpdate);

        if (!SuperAdminUpdate) {
            return res.status(404).json(
                {
                    success: true,
                    message: "Data not Updated"
                }
            )
        }

        if (SuperAdminUpdate) {
            return res.status(200).json(
                {
                    success: true,
                    message: "SuperAdmin updated"
                }
            )
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
