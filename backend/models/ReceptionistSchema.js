const mongoose = require("mongoose");

const ReceptionistSchema = new mongoose.Schema({

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

    role: {
        type: String,
        default: "receptionist"
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    }

},
{
    timestamps: true,
});

module.exports = mongoose.model("ReceptionistData",ReceptionistSchema);