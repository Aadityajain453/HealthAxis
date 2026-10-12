import { useNavigate, useParams } from "react-router-dom";
import ReceptionistNavbar from "./ReceptionistNavbar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ReceptionistEditPatient = () => {

    const { ptId } = useParams();

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

    const [loading, setLoading] = useState(false);
    const [originalData, setOriginalData] = useState({});

    useEffect(() => {
        fetchPatientsForEdit();
    }, [ptId]);

    const fetchPatientsForEdit = async () => {
        try {

            const response = await axios.get(
                `http://localhost:5000/api/patient/fetchpatientforedit/${ptId}`
            );

            setFirstName(response.data.firstname);
            setLastName(response.data.lastname);
            setEmail(response.data.email);
            setMobile(response.data.mobile);
            setDOB(response.data.dob);
            setGender(response.data.gender);
            setBloodGroup(response.data.bloodgroup);
            setAddress(response.data.address);
            setCity(response.data.city);
            setState(response.data.state);
            setPincode(response.data.pincode);

            setOriginalData({
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                mobile: response.data.mobile,
                dob: response.data.dob,
                gender: response.data.gender,
                bloodgroup: response.data.bloodgroup,
                address: response.data.address,
                city: response.data.city,
                state: response.data.state,
                pincode: response.data.pincode
            });

        } catch (error) {
            console.log(error);
        }
    };

    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const mobileRef = useRef(null);
    const dobRef = useRef(null);
    const bloodgroupRef = useRef(null);
    const addressRef = useRef(null);
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const pincodeRef = useRef(null);

    const namePattern = (str) => {

        let f = true;

        for (let i = 0; i < str.length; i++) {

            let ch = str.charAt(i);

            if (
                !(
                    (ch >= "a" && ch <= "z") ||
                    (ch >= "A" && ch <= "Z") ||
                    ch === " "
                )
            ) {
                f = false;
                break;
            }
        }

        return f;
    };

    const handleUpdatePatient = async () => {

        const bloodGroupPattern = /^(A|B|AB|O)[+-]$/;
        const mobilenumberpattern = /^[6-9][0-9]{9}$/;
        const pincodePattern = /^[1-9][0-9]{5}$/;

        if (!firstname.trim()) {
            toast.error("First Name is required");
            firstnameRef.current.focus();
            return;
        }

        if (namePattern(firstname) === false) {
            toast.error("Please enter only alphabets in First Name");
            firstnameRef.current.focus();
            return;
        }

        if (!lastname.trim()) {
            toast.error("Last Name is required");
            lastnameRef.current.focus();
            return;
        }

        if (namePattern(lastname) === false) {
            toast.error("Please enter only alphabets in Last Name");
            lastnameRef.current.focus();
            return;
        }

        if (!mobile.trim()) {
            toast.error("Mobile Number is required");
            mobileRef.current.focus();
            return;
        }

        if (!mobilenumberpattern.test(mobile)) {
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
            toast.error("Please enter a valid blood group");
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

        if (namePattern(city) === false) {
            toast.error("Please enter a valid City");
            cityRef.current.focus();
            return;
        }

        if (!state.trim()) {
            toast.error("State is required");
            stateRef.current.focus();
            return;
        }

        if (namePattern(state) === false) {
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

        if (
            firstname === originalData.firstname &&
            lastname === originalData.lastname &&
            mobile === originalData.mobile &&
            dob === originalData.dob &&
            gender === originalData.gender &&
            bloodgroup === originalData.bloodgroup &&
            address === originalData.address &&
            city === originalData.city &&
            state === originalData.state &&
            pincode === originalData.pincode
        ) {
            toast.warning("No changes were made");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.put(
                "http://localhost:5000/api/patient/UpdatePatientData",
                {
                    firstname,
                    lastname,
                    email,
                    mobile,
                    gender,
                    bloodgroup,
                    city,
                    state,
                    pincode,
                    dob,
                    address,
                    ptId
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

                <h2 className="text-center my-2">
                    Edit Patient
                </h2>

                <div className="my-3">
                    <label className="fw-bold">
                        Patient ID :
                    </label>

                    <input
                        className="form-control"
                        type="text"
                        value={ptId}
                        readOnly
                    />
                </div>

                <div className="my-3">
                    <label
                        htmlFor="first"
                        className="fw-bold"
                    >
                        First Name :
                    </label>

                    <input
                        className="form-control"
                        ref={firstnameRef}
                        type="text"
                        id="first"
                        value={firstname}
                        onChange={(event) =>
                            setFirstName(event.target.value)
                        }
                    />
                </div>

                <div className="my-3">
                    <label
                        htmlFor="last"
                        className="fw-bold"
                    >
                        Last Name :
                    </label>

                    <input
                        className="form-control"
                        ref={lastnameRef}
                        type="text"
                        id="last"
                        value={lastname}
                        onChange={(event) =>
                            setLastName(event.target.value)
                        }
                    />
                </div>

                <div className="my-3">
                    <label
                        htmlFor="eml"
                        className="fw-bold"
                    >
                        Email :
                    </label>

                    <input
                        className="form-control"
                        type="text"
                        readOnly
                        id="eml"
                        value={email}
                    />
                </div>

                <div className="my-3">
                    <label
                        htmlFor="mbno"
                        className="fw-bold"
                    >
                        Mobile No. :
                    </label>

                    <input
                        className="form-control"
                        ref={mobileRef}
                        type="text"
                        id="mbno"
                        maxLength={10}
                        value={mobile}
                        onChange={(event) =>
                            setMobile(event.target.value)
                        }
                    />
                </div>

                <div className="my-3">
                    <label
                        htmlFor="db"
                        className="fw-bold"
                    >
                        Date of birth :
                    </label>

                    <input
                        className="form-control"
                        ref={dobRef}
                        type="date"
                        id="db"
                        value={dob}
                        onChange={(event) =>
                            setDOB(event.target.value)
                        }
                    />
                </div>

                <div>

                    <span className="fw-bold">
                        Gender :
                    </span>

                    <div className="mt-2">

                        <label htmlFor="ml">
                            Male &nbsp;
                        </label>

                        <input
                            type="radio"
                            id="ml"
                            value="Male"
                            onChange={(event) =>
                                setGender(event.target.value)
                            }
                            checked={gender === "Male"}
                            name="gender"
                        />

                    </div>

                    <div>

                        <label htmlFor="feml">
                            Female &nbsp;
                        </label>

                        <input
                            type="radio"
                            id="feml"
                            value="Female"
                            onChange={(event) =>
                                setGender(event.target.value)
                            }
                            checked={gender === "Female"}
                            name="gender"
                        />

                    </div>

                </div>

                <div className="my-3">

                    <label
                        className="fw-bold"
                        htmlFor="lbl"
                    >
                        Blood Group :
                    </label>

                    <input
                        className="form-control"
                        ref={bloodgroupRef}
                        type="text"
                        id="lbl"
                        value={bloodgroup}
                        onChange={(event) =>
                            setBloodGroup(
                                event.target.value.toUpperCase()
                            )
                        }
                    />

                </div>

                <div className="my-3">

                    <label
                        htmlFor="addr"
                        className="fw-bold"
                    >
                        Address :
                    </label>

                    <input
                        className="form-control"
                        ref={addressRef}
                        type="text"
                        id="addr"
                        value={address}
                        onChange={(event) =>
                            setAddress(event.target.value)
                        }
                    />

                </div>

                <div className="my-3">

                    <label
                        htmlFor="cy"
                        className="fw-bold"
                    >
                        City:
                    </label>

                    <input
                        className="form-control"
                        ref={cityRef}
                        type="text"
                        id="cy"
                        value={city}
                        onChange={(event) =>
                            setCity(event.target.value)
                        }
                    />

                </div>

                <div className="my-3">

                    <label
                        htmlFor="st"
                        className="fw-bold"
                    >
                        State:
                    </label>

                    <input
                        className="form-control"
                        ref={stateRef}
                        type="text"
                        id="st"
                        value={state}
                        onChange={(event) =>
                            setState(event.target.value)
                        }
                    />

                </div>

                <div className="my-3">

                    <label
                        htmlFor="pin"
                        className="fw-bold"
                    >
                        Pin Code :
                    </label>

                    <input
                        className="form-control"
                        ref={pincodeRef}
                        type="text"
                        maxLength={6}
                        id="pin"
                        value={pincode}
                        onChange={(event) =>
                            setPincode(event.target.value)
                        }
                    />

                </div>

                <div className="text-center">

                    <button
                        onClick={handleUpdatePatient}
                        disabled={loading}
                        className="btn btn-primary w-25 fw-bold fs-5"
                    >
                        {loading
                            ? "Updating..."
                            : "Update"}
                    </button>

                </div>

            </div>
        </>
    );
};

export default ReceptionistEditPatient;