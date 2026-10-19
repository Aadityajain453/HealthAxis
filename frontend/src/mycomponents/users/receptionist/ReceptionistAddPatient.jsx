
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReceptionistNavbar from "./ReceptionistNavbar";

const ReceptionistAddPatient = () => {
    const navigate = useNavigate();

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDOB] = useState("");
    const [gender, setGender] = useState("");
    const [bloodgroup, setBloodGroup] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const emailRef = useRef(null);
    const mobileRef = useRef(null);
    const dobRef = useRef(null);
    const bloodgroupRef = useRef(null);
    const addressRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const pincodeRef = useRef(null);
    const passwordRef = useRef(null);

    const namePattern = (str) => {
        return /^[a-zA-Z ]+$/.test(str);
    };

    const handleAddPatient = async () => {
        const bloodGroupPattern = /^(A|B|AB|O)[+-]$/;
        const mobilePattern = /^[6-9][0-9]{9}$/;
        const pincodePattern = /^[1-9][0-9]{5}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstname.trim()) {
            toast.error("First Name is required");
            firstnameRef.current.focus();
            return;
        }
        if (!namePattern(firstname.trim())) {
            toast.error("Please enter only alphabets in First Name");
            firstnameRef.current.focus();
            return;
        }

        if (!lastname.trim()) {
            toast.error("Last Name is required");
            lastnameRef.current.focus();
            return;
        }
        if (!namePattern(lastname.trim())) {
            toast.error("Please enter only alphabets in Last Name");
            lastnameRef.current.focus();
            return;
        }

        if (!email.trim()) {
            toast.error("Email is required");
            emailRef.current.focus();
            return;
        }
        if (!emailPattern.test(email.trim())) {
            toast.error("Please enter a valid email");
            emailRef.current.focus();
            return;
        }

        if (!mobile.trim()) {
            toast.error("Mobile Number is required");
            mobileRef.current.focus();
            return;
        }
        if (!mobilePattern.test(mobile)) {
            toast.error("Invalid Mobile Number");
            mobileRef.current.focus();
            return;
        }

        if (!dob) {
            toast.error("Date of Birth is required");
            dobRef.current.focus();
            return;
        }
        if (new Date(dob) > new Date()) {
            toast.error("Date of Birth cannot be in the future");
            dobRef.current.focus();
            return;
        }

        if (!gender) {
            toast.error("Please select Gender");
            return;
        }

        if (!bloodgroup.trim()) {
            toast.error("Blood Group is required");
            bloodgroupRef.current.focus();
            return;
        }
        if (!bloodGroupPattern.test(bloodgroup)) {
            toast.error("Please enter a valid blood group, e.g. A+");
            bloodgroupRef.current.focus();
            return;
        }

        if (!address.trim()) {
            toast.error("Address is required");
            addressRef.current.focus();
            return;
        }

        if (!city.trim()) {
            toast.error("City is required");
            cityRef.current.focus();
            return;
        }
        if (!namePattern(city.trim())) {
            toast.error("Please enter a valid City");
            cityRef.current.focus();
            return;
        }

        if (!state.trim()) {
            toast.error("State is required");
            stateRef.current.focus();
            return;
        }
        if (!namePattern(state.trim())) {
            toast.error("Please enter a valid State");
            stateRef.current.focus();
            return;
        }

        if (!pincode.trim()) {
            toast.error("Pincode is required");
            pincodeRef.current.focus();
            return;
        }
        if (!pincodePattern.test(pincode)) {
            toast.error("Please enter a valid Pincode");
            pincodeRef.current.focus();
            return;
        }

        if (!password) {
            toast.error("Password is required");
            passwordRef.current.focus();
            return;
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            passwordRef.current.focus();
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/patient/patientreg",
                {
                    firstname: firstname.trim(),
                    lastname: lastname.trim(),
                    email: email.trim(),
                    mobile,
                    dob,
                    gender,
                    bloodgroup,
                    address: address.trim(),
                    city: city.trim(),
                    state: state.trim(),
                    pincode,
                    password
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);

                setTimeout(() => {
                    navigate("/receptionist/patients", {
                        replace: true
                    });
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ReceptionistNavbar />

            <div className="container p-3">
                <h2 className="text-center my-3">Add Patient</h2>

                <div className="my-3">
                    <label className="fw-bold">First Name:</label>
                    <input
                        ref={firstnameRef}
                        className="form-control"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                <div className="my-3">
                    <label className="fw-bold">Last Name:</label>
                    <input
                        ref={lastnameRef}
                        className="form-control"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div className="my-3">
                    <label className="fw-bold">Email:</label>
                    <input
                        ref={emailRef}
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-3">
                    <label className="fw-bold">Mobile Number:</label>
                    <input
                        ref={mobileRef}
                        className="form-control"
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>

                <div className="my-3">
                    <label className="fw-bold">Date of Birth:</label>
                    <input
                        ref={dobRef}
                        type="date"
                        className="form-control"
                        value={dob}
                        onChange={(e) => setDOB(e.target.value)}
                    />
                </div>

                <div className="my-3">
                    <label className="fw-bold d-block">Gender:</label>
                    <label className="me-3">
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={gender === "Male"}
                            onChange={(e) => setGender(e.target.value)}
                        />{" "}
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={gender === "Female"}
                            onChange={(e) => setGender(e.target.value)}
                        />{" "}
                        Female
                    </label>
                </div>

                <div className="my-3">
                    <label className="fw-bold">Blood Group:</label>
                    <input
                        ref={bloodgroupRef}
                        className="form-control"
                        placeholder="e.g. A+"
                        value={bloodgroup}
                        onChange={(e) => setBloodGroup(e.target.value.toUpperCase())}
                    />
                </div>

                <div className="my-3">
                    <label className="fw-bold">Address:</label>
                    <input
                        ref={addressRef}
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="my-3">
                    <label className="fw-bold">City:</label>
                    <input
                        ref={cityRef}
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                <div className="my-3">
                    <label className="fw-bold">State:</label>
                    <input
                        ref={stateRef}
                        className="form-control"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>

                <div className="my-3">
                    <label className="fw-bold">Pincode:</label>
                    <input
                        ref={pincodeRef}
                        className="form-control"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                </div>

                <div className="my-3">
                    <label className="fw-bold">Password:</label>
                    <input
                        ref={passwordRef}
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="d-flex justify-content-center gap-2 my-4">
                    <button
                        className="btn btn-success fw-bold"
                        onClick={handleAddPatient}
                        disabled={loading}
                    >
                        {loading ? "Adding Patient..." : "Add Patient"}
                    </button>

                    <button
                        className="btn btn-secondary fw-bold"
                        onClick={() => navigate("/receptionist/patients")}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default ReceptionistAddPatient;
