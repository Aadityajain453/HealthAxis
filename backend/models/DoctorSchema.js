const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    mobile: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    department: {
        type: String,
        required: true,
    },

    specialization: {
        type: String,
        required: true,
    },

    qualification: {
        type: String,
        required: true,   
    },

    experience: {
        type: Number,
        required: true,
        min : 0,
    },

    consultation_fee: {
        type: Number,
        required: true,
        min : 0,
    },

    role: {
        type: String,
        default: "doctor"
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }

},
    {
        timestamps : true,
    }
)

module.exports = mongoose.model("DoctorData", DoctorSchema);