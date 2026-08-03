
const DotEnv = require('dotenv');
DotEnv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PatientRoutes = require('./routes/PatientRouters');
const AdminRoutes = require('./routes/AdminRouters');
const DoctorRoutes = require('./routes/DoctorRoutes');

// middleware

app.use(express.json()); // Parse incoming JSON requests

app.use(cors()); // Allow requests from React



// Access the variables using process.env

const port = process.env.PORT || 3000;

// connect to mongodb
mongoose.connect(process.env.MongoDB_URL).then(() => console.log("Connected to mongodb successfully.")).catch(error => console.error("Mongodb connection error :", error));


// Routes 

app.use('/api/patient', PatientRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/doctor', DoctorRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});