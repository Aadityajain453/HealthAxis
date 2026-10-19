import { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import axios from "axios";
import { Link } from "react-router-dom";

const PatientProfile = () => {

    const [patients, setPatients] = useState({});

    useEffect(() => {
        fetchPatientProfile();
    }, []);

    const fetchPatientProfile = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/patient/fetchpatientdetails",
                {},
                {
                    withCredentials: true
                }
            );

            console.log(response.data);
            setPatients(response.data);

        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <>
            <PatientNavbar />

            <div className="container mt-5">

                <div className="row justify-content-center">

                    <div className="col-md-8 col-lg-7">

                        <div className="card shadow">

                            <div className="card-header bg-primary text-white text-center">
                                <h3 className="mb-0">My Profile</h3>
                            </div>

                            <div className="card-body p-4">

                                <div className="text-center mb-4">
                                    <div
                                        className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            fontSize: "30px"
                                        }}
                                    >
                                        {patients.firstname?.charAt(0)}
                                    </div>

                                    <h4 className="mt-3 mb-1">
                                        {patients.firstname} {patients.lastname}
                                    </h4>

                                    <p className="text-muted mb-0">
                                        Patient ID: {patients.patientID}
                                    </p>
                                </div>

                                <hr />

                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <strong>Email</strong>
                                        <p className="text-muted mb-0">
                                            {patients.email}
                                        </p>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>Mobile</strong>
                                        <p className="text-muted mb-0">
                                            {patients.mobile}
                                        </p>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>Date of Birth</strong>
                                        <p className="text-muted mb-0">
                                            {patients.dob}
                                        </p>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>Gender</strong>
                                        <p className="text-muted mb-0">
                                            {patients.gender}
                                        </p>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>Blood Group</strong>
                                        <p className="text-muted mb-0">
                                            {patients.bloodgroup}
                                        </p>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>Pincode</strong>
                                        <p className="text-muted mb-0">
                                            {patients.pincode}
                                        </p>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <strong>Address</strong>
                                        <p className="text-muted mb-0">
                                            {patients.address}
                                        </p>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <strong>City</strong>
                                        <p className="text-muted mb-0">
                                            {patients.city}
                                        </p>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <strong>State</strong>
                                        <p className="text-muted mb-0">
                                            {patients.state}
                                        </p>
                                    </div>

                                </div>

                                <div className="text-center mt-3">
                                    <Link to={'/edit_patient_profile'} className="btn btn-primary px-4">
                                        Edit Profile
                                    </Link>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
export default PatientProfile;