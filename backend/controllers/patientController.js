const PatientData = require("../models/PatientSchema");
const SecurityData = require("../models/Login");
const bcrypt = require("bcrypt");



// get Patient registration data 



exports.getPatientRegData = async (req,res) => {
    try{
        console.log("Received Data is :",req.body);
        const {firstname, lastname, email, mobile, dob, gender, bloodgroup, address, city, state, pincode, password } = req.body;

        const handlePassword = await bcrypt.hash(password,10);

        const utype = "patient";

        const existingUser = await SecurityData.findOne({email});

        if(existingUser) {
            res.status(400).json(
                {
                    message : "Email already exists"
                }
            );
            return
        }
        const PatientRecord = new PatientData({firstname,lastname,email,mobile,dob,gender,bloodgroup,address,city,state,pincode})

        const PatientSecurityRecord = new SecurityData({email,password:handlePassword,usertype:utype});

        let newrecord = await PatientRecord.save();

        let srecord = await PatientSecurityRecord.save();

        if(newrecord){
            res.status(201).json(
                {
                    message : "Patient registered successfully",
                    success : true
                }
            )
            return
        } 
        

    }catch(error){
        console.log(error);
        res.status(500).json(
            {
                Error : "Something went wrong try again"
            }
        )
    }
}

