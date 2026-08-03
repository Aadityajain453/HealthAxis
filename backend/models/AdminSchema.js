const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
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

    role : {
        type : String,
        enum : ["superadmin", "admin"],
        default : "admin"
    },

},
    {
        timestamps : true,
    }
)

module.exports = mongoose.model("AdminData",AdminSchema);