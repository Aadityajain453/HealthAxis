import { useRef, useState } from "react"
import AdminNavbar from "./AdminNavbar"
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminReg = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");





    const handleFirstName = (str) => {

        let f = true;

        for (let i = 0; i < str.length; i++) {

            let ch = str.charAt(i);

            if (!((ch >= 'a' && ch <= 'z') ||
                (ch >= 'A' && ch <= 'Z') || ch === " ")) {

                f = false;
                break;
            }
        }

        return f;
    }


    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const emailRef = useRef(null);
    const mobileRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    const handleAdminRegister = async () => {

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const mobilePattern = /^[6-9][0-9]{9}$/;

        if (!firstName.trim()) {
            toast.error("First Name is required");
            firstnameRef.current.focus();
            return;
        }
        if (handleFirstName(firstName) === false) {
            toast.error("Must be enter only alphabets");
            firstnameRef.current.focus();
            return;
        }
        if (!lastName.trim()) {
            toast.error("Last Name is required");
            lastnameRef.current.focus();
            return;
        }
        if (handleFirstName(lastName) === false) {
            toast.error("Must be enter only alphabets");
            lastnameRef.current.focus();
            return;
        }
        if (!email.trim()) {
            toast.error("Email is required");
            emailRef.current.focus();
            return;
        }
        if (!emailPattern.test(email)) {
            toast.error("Invalid email");
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
        if (!gender) {
            toast.error("Please select Gender");
            return;
        }
        if (!password.trim()) {
            toast.error("Password is required");
            passwordRef.current.focus();
            return;
        }
        if (!confirm.trim()) {
            toast.error("Confirm Password is required");
            confirmRef.current.focus();
            return;
        }
        if (confirm !== password) {
            toast.error("Passwords do not match");
            confirmRef.current.focus();
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/admin/AdminRegisterData", { firstName, lastName, email, mobile, gender, password });

            let result = response.data;
            console.log(result);

            if (result.message === "Admin registered successfully") {

                toast.success(result.message);
                setFirstName("");
                setLastName("");
                setEmail("");
                setMobile("");
                setGender("");
                setPassword("");
                setConfirm("")

            }

        }
        catch (error) {
            console.log(error);

            const message = error.response?.data?.message || "Something went wrong";
            console.log(message);

            toast.error(message);
        }

    }
    return (
        <>
            <AdminNavbar />
            <div className="container">

                <h2 className="text-center mt-3">Admin Registration</h2>
                <div className="my-3">
                    <label className="form-group fw-bold" htmlFor="name">First Name :</label>
                    <input ref={firstnameRef} className="form-control" type="text" id="name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                </div>

                <div className="my-3">
                    <label className="form-group fw-bold" htmlFor="last">Last Name :</label>
                    <input ref={lastnameRef} className="form-control" type="text" id="last" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                </div>

                <div className="my-3">
                    <label className="form-group fw-bold" htmlFor="eml">Email :</label>
                    <input ref={emailRef} className="form-control" type="email" id="eml" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div className="my-3">
                    <label className="form-group fw-bold" htmlFor="mob">Mobile-No :</label>
                    <input ref={mobileRef} className="form-control" type="tel" maxLength={10} id="mob" value={mobile} onChange={(event) => setMobile(event.target.value)} />
                </div>

                <div>
                    <b>Gender : {gender}</b>
                    <div className="my-3">
                        <label htmlFor="male">Male &nbsp;</label>
                        <input style={{ transform: "scale(1.2)" }} type="radio" checked={gender === "Male"} id="male" value={"Male"} name="gender" onChange={(event) => setGender(event.target.value)} />
                    </div>

                    <div className="my-3">
                        <label htmlFor="female">Female &nbsp;</label>
                        <input style={{ transform: "scale(1.2)" }} checked={gender === "Female"} type="radio" id="female" value={"Female"} name="gender" onChange={(event) => setGender(event.target.value)} />
                    </div>
                </div>

                <div className="my-3">
                    <label className="form-group fw-bold" htmlFor="pass">Password :</label>
                    <input ref={passwordRef} className="form-control" type="text" id="pass" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>

                <div className="my-3">
                    <label className="form-group fw-bold" htmlFor="cpass">Confirm Password :</label>
                    <input ref={confirmRef} className="form-control" type="text" id="cpass" value={confirm} onChange={(event) => setConfirm(event.target.value)} />
                </div>

                <div className="text-center my-4">
                    <button onClick={handleAdminRegister} className="btn btn-dark px-5 ">
                        Submit
                    </button>
                </div>

            </div>
        </>
    )
}