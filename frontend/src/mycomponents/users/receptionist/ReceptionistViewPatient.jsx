import { useParams } from "react-router-dom";
import ReceptionistNavbar from "./ReceptionistNavbar";
import { useEffect, useState } from "react";
import axios from "axios";

const ReceptionistViewPatient = () => {

    const { ptId } = useParams();

    const [patientprofile, setPatientProfile] = useState({});

    useEffect(() => {
        fetchPatientDetails();
    }, [ptId]);

    const fetchPatientDetails = async () => {
        try {

            const response = await axios.post(
                "http://localhost:5000/api/patient/fetchpatientdetails",
                { ptId }
            );

            setPatientProfile(response.data);

            console.log("Patient Details:", response.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <ReceptionistNavbar />

            <div className="container my-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="fw-bold mb-0">
                        Patient Details
                    </h2>

                    <span className="badge bg-primary fs-6 px-3 py-2">
                        {patientprofile.patientID}
                    </span>

                </div>

                <div className="card shadow-sm border-0">

                    <div className="card-header bg-primary text-white py-3">
                        <h4 className="mb-0">
                            Patient Information
                        </h4>
                    </div>

                    <div className="card-body p-4">

                        <div className="row">

                            <div className="col-md-6 mb-4">
                                <label className="fw-bold mb-2">
                                    Patient ID
                                </label>

                                <div className="border rounded p-2 bg-light">
                                    {patientprofile.patientID}
                                </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <label className="fw-bold mb-2">
                                    Full Name
                                </label>

                                <div className="border rounded p-2 bg-light">
                                    {patientprofile.firstname} {patientprofile.lastname}
                                </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <label className="fw-bold mb-2">
                                    Email
                                </label>

                                <div className="border rounded p-2 bg-light">
                                    {patientprofile.email}
                                </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <label className="fw-bold mb-2">
                                    Mobile Number
                                </label>

                                <div className="border rounded p-2 bg-light">
                                    {patientprofile.mobile}
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <label className="fw-bold mb-2">
                                    Date of Birth
                                </label>

                                <div className="border rounded p-2 bg-light">
                                    {patientprofile.dob}
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <label className="fw-bold mb-2">
                                    Gender
                                </label>

                                <div className="border rounded p-2 bg-light">
                                    {patientprofile.gender}
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <label className="fw-bold mb-2">
                                    Blood Group
                                </label>

                                <div className="border rounded p-2 bg-light">
                                    {patientprofile.bloodgroup}
                                </div>
                            </div>

                            <div className="col-md-12 mb-4">
                                <label className="fw-bold mb-2">
                                    Address
                                </label>

                                <div className="border rounded p-2 bg-light">
                                    {patientprofile.address}
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <label className="fw-bold mb-2">
                                    City
                                </label>

                                <div className="border rounded p-2 bg-light">
                                    {patientprofile.city}
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <label className="fw-bold mb-2">
                                    State
                                </label>

                                <div className="border rounded p-2 bg-light">
                                    {patientprofile.state}
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <label className="fw-bold mb-2">
                                    Pincode
                                </label>

                                <div className="border rounded p-2 bg-light">
                                    {patientprofile.pincode}
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="card-footer bg-white text-end">

                        <button
                            className="btn btn-secondary"
                            onClick={() => window.history.back()}
                        >
                            Back
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
};

export default ReceptionistViewPatient;