import { useEffect, useState } from "react";
import PatientNavbar from "./PatientNavbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditPatientProfile = () => {

    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        dob: "",
        gender: "",
        bloodgroup: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    })

    const [originalPatient, setOriginalPatient] = useState({});

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
            setPatient(response.data);
            setOriginalPatient(response.data);

        } catch (error) {
            console.log("Fetch Profile Error:", error.response?.data || error.message);
            toast.error(
                error.response?.data?.message || "Unable to fetch profile"
            );
        }
    };


    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async () => {
        if (
            patient.firstname === originalPatient.firstname &&
            patient.lastname === originalPatient.lastname &&
            patient.mobile === originalPatient.mobile &&
            patient.dob === originalPatient.dob &&
            patient.gender === originalPatient.gender &&
            patient.bloodgroup === originalPatient.bloodgroup &&
            patient.address === originalPatient.address &&
            patient.city === originalPatient.city &&
            patient.state === originalPatient.state &&
            patient.pincode === originalPatient.pincode
        ) {
            toast.info("No updates here");
            return;
        }
        try {

            const response = await axios.put(
                "http://localhost:5000/api/patient/UpdatePatientData",
                {
                    firstname: patient.firstname,
                    lastname: patient.lastname,
                    mobile: patient.mobile,
                    gender: patient.gender,
                    address: patient.address,
                    pincode: patient.pincode,
                    dob: patient.dob,
                    bloodgroup: patient.bloodgroup,
                    city: patient.city,
                    state: patient.state
                },
                {
                    withCredentials: true
                }
            );


            console.log(response.data);

            if (response.data.success) {
                toast.success("Profile updated successfully");
                navigate('/myprofile', { replace: true });

            }

        } catch (error) {
            console.log(
                "Update Profile Error:",
                error.response?.data || error.message
            );

            toast.error(
                error.response?.data?.message ||
                "Unable to update profile"
            );
        }
    }

    return (
        <>
            <PatientNavbar />

            <div className="container mt-5">

                <div className="row justify-content-center">

                    <div className="col-md-8 col-lg-7">

                        <div className="card shadow">

                            <div className="card-header bg-info text-white text-center">
                                <h3 className="mb-0">Edit Profile</h3>
                            </div>

                            <div className="card-body p-4">



                                <div className="row">

                                    {/* First Name */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control border-info"
                                            name="firstname"
                                            value={patient.firstname}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control border-info"
                                            name="lastname"
                                            value={patient.lastname}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control border-info"
                                            value={patient.email}
                                            disabled
                                        />
                                    </div>

                                    {/* Mobile */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Mobile
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control border-info"
                                            name="mobile"
                                            value={patient.mobile}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* DOB */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Date of Birth
                                        </label>

                                        <input
                                            type="date"
                                            className="form-control border-info"
                                            name="dob"
                                            value={patient.dob}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Gender
                                        </label>

                                        <select
                                            className="form-select border-info"
                                            name="gender"
                                            value={patient.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select Gender
                                            </option>

                                            <option value="Male">
                                                Male
                                            </option>

                                            <option value="Female">
                                                Female
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>
                                        </select>
                                    </div>

                                    {/* Blood Group */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Blood Group
                                        </label>

                                        <select
                                            className="form-select border-info"
                                            name="bloodgroup"
                                            value={patient.bloodgroup}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select Blood Group
                                            </option>

                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>

                                    {/* Pincode */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Pincode
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control border-info"
                                            name="pincode"
                                            value={patient.pincode}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="col-12 mb-3">
                                        <label className="form-label">
                                            Address
                                        </label>

                                        <textarea
                                            className="form-control border-info"
                                            rows="3"
                                            name="address"
                                            value={patient.address}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>

                                    {/* City */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            City
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control border-info"
                                            name="city"
                                            value={patient.city}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {/* State */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            State
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control border-info"
                                            name="state"
                                            value={patient.state}
                                            onChange={handleChange}
                                        />
                                    </div>

                                </div>

                                <div className="text-center mt-3">

                                    <button
                                        onClick={handleSubmit}
                                        className="btn btn-info text-white px-5"
                                    >
                                        Update Profile
                                    </button>

                                </div>



                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default EditPatientProfile;