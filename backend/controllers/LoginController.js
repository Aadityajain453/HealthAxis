const bcrypt = require("bcrypt");
const SecurityData = require("../models/Login");

exports.loginUser = async (req, res) => {

    try {

        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const user = await SecurityData.findOne({
            email: email
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        if (user.usertype !== role) {
            return res.status(401).json({
                success: false,
                message: "Invalid role"
            });
        }

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

        req.session.user = {
            email: user.email,
            usertype: user.usertype
        };

        return res.json({
            success: true,
            message: "Login successful",
            usertype: user.usertype,
            email: user.email
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};
