import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useRef } from "react";


export const AddPatient = () => {

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
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("");


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
    const passRef = useRef(null);
    const cpassRef = useRef(null);

    const namePattern = (str) => {
        let f = true;

        for (let i = 0; i < str.length; i++) {

            let ch = str.charAt(i);

            if (!((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === " ")) {
                f = false;
                break;
            }
        }
        return f;
    }

    const handlePatientRegistration = async () => {

        const bloodGroupPattern = /^(A|B|AB|O)[+-]$/;
        // const namePattern = /^[A-Za-z ]+$/;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        if (!email.trim()) {
            toast.error("Email is required");
            emailRef.current.focus();
            return;
        }
        if (!emailPattern.test(email)) {
            toast.error("Please enter a valid email");
            emailRef.current.focus();
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
        if (!namePattern(city)) {
            toast.error("Please enter a valid City");
            cityRef.current.focus();
            return;
        }
        if (!state.trim()) {
            toast.error("State is required");
            stateRef.current.focus();
            return;
        }
        if (!namePattern(state)) {
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
        if (!password.trim()) {
            toast.error("Password is required");
            passRef.current.focus();
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            passRef.current.focus();
            return;
        }
        if (!confirmpassword.trim()) {
            toast.error("Confirm Password is required");
            cpassRef.current.focus();
            return;
        }
        if (password !== confirmpassword) {
            toast.error("Password do not match");
            cpassRef.current.focus();
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/patient/patientreg", {
                firstname, lastname, email, mobile, dob, gender, bloodgroup, address, city, state, pincode, password
            })

            let ComingRecord = await response.data;
            console.log(ComingRecord);

            if (ComingRecord.message === "Patient registered successfully") {

                toast.success("Registration Successfull");
                setFirstName("");
                setLastName("");
                setEmail("");
                setMobile("");
                setDOB("");
                setGender("");
                setBloodGroup("");
                setAddress("");
                setCity("");
                setState("");
                setPincode("");
                setPassword("");
                setConfirmPassword("");
            }
        } catch (error) {
            console.log(error);
            if (error.response?.status === 400) {
                toast.error("Email already registered");
            }
            else {
                toast.error("Something went wrong");
            }
        }
    }



    return (
        <>
            <AdminNavbar />
            <div className="container backcolor p-3">
                <h2 className="text-center my-2">Patient Registration</h2>
                <div className="my-3">
                    <label htmlFor="first" className="fw-bold">First Name :</label>
                    <input className="form-control " ref={firstnameRef} type="text" id="first" value={firstname} placeholder="your first name" onChange={(event) => setFirstName(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="last" className="fw-bold">Last Name :</label>
                    <input className="form-control" ref={lastnameRef} type="text" id="last" value={lastname} placeholder="your last name" onChange={(event) => setLastName(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="eml" className="fw-bold">Email :</label>
                    <input className="form-control" ref={emailRef} type="text" id="eml" value={email} placeholder="your email" onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="mbno" className="fw-bold">Mobile No. :</label>
                    <input className="form-control" ref={mobileRef} type="text" id="mbno" maxLength={10} value={mobile} placeholder="your mobile number" onChange={(event) => setMobile(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="db" className="fw-bold">Date of birth :</label>
                    <input className="form-control" ref={dobRef} type="date" id="db" value={dob} onChange={(event) => setDOB(event.target.value)} />
                </div>

                <div>
                    <span className="fw-bold">Gender :</span>
                    <div className="mt-2">
                        <label htmlFor="ml">Male &nbsp;</label>
                        <input style={{ transform: "scale(1.2)" }} type="radio" id="ml" value={"Male"} onChange={(event) => setGender(event.target.value)} checked={gender === "Male"} name="gender" />
                    </div>

                    <div>
                        <label htmlFor="feml">Female &nbsp;</label>
                        <input style={{ transform: "scale(1.2)" }} type="radio" id="feml" value={"Female"} onChange={(event) => setGender(event.target.value)} checked={gender === "Female"} name="gender" />
                    </div>
                </div>

                <div className="my-3">
                    <label className="fw-bold" htmlFor="lbl">Blood Group :</label>
                    <input className="form-control" ref={bloodgroupRef} type="text" id="lbl" value={bloodgroup} placeholder="A+" onChange={(event) => setBloodGroup(event.target.value.toUpperCase())} />
                </div>

                <div className="my-3">
                    <label htmlFor="addr" className="fw-bold">Address :</label>
                    <input className="form-control" ref={addressRef} type="text" id="addr" value={address} placeholder="full address" onChange={(event) => setAddress(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="cy" className="fw-bold">City:</label>
                    <input className="form-control" ref={cityRef} type="text" id="cy" value={city} placeholder="your city" onChange={(event) => setCity(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="st" className="fw-bold">State:</label>
                    <input className="form-control" ref={stateRef} type="text" id="st" value={state} placeholder="your state" onChange={(event) => setState(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="pin" className="fw-bold">Pin Code :</label>
                    <input className="form-control" ref={pincodeRef} type="text" maxLength={6} id="pin" value={pincode} placeholder="your pin code " onChange={(event) => setPincode(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="pas" className="fw-bold">Password :</label>
                    <input className="form-control" ref={passRef} type="password" id="pas" value={password} placeholder="your password" onChange={(event) => setPassword(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="cpas" className="fw-bold">Confirm Password :</label>
                    <input className="form-control" ref={cpassRef} type="password" id="cpas" value={confirmpassword} placeholder="your confirm password" onChange={(event) => setConfirmPassword(event.target.value)} />
                </div>

                <div className="text-center">
                    <button className="btn btn-primary w-25 fw-bold fs-5" onClick={handlePatientRegistration}>
                        Register
                    </button>
                </div>

            </div>


        </>
    )
}