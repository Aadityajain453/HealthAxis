import { useRef, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { toast } from "react-toastify";
import axios from "axios";

const ReceptionistRegistration = () => {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const firstnameref = useRef(null);
    const lastnameref = useRef(null);
    const emailref = useRef(null);
    const mobileref = useRef(null);
    const passwordref = useRef(null);
    const confirmref = useRef(null);


    const handleNameValidation = (str) => {

        let f = true;

        for (let i = 0; i < str.length; i++) {

            let ch = str.charAt(i);

            if (
                !(
                    (ch >= 'a' && ch <= 'z') ||
                    (ch >= 'A' && ch <= 'Z') ||
                    ch === " "
                )
            ) {
                f = false;
                break;
            }
        }

        return f;
    };


    const handleReceptionistRegister = async () => {

        const mobilenumberpattern = /^[6-9][0-9]{9}$/;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        // First Name
        if (!firstname.trim()) {
            toast.error("First name is required");
            firstnameref.current.focus();
            return;
        }

        if (handleNameValidation(firstname) === false) {
            toast.error("Must be enter only alphabets");
            firstnameref.current.select();
            return;
        }


        // Last Name
        if (!lastname.trim()) {
            toast.error("Last name is required");
            lastnameref.current.focus();
            return;
        }

        if (handleNameValidation(lastname) === false) {
            toast.error("Must be enter only alphabets");
            lastnameref.current.select();
            return;
        }


        // Email
        if (!email.trim()) {
            toast.error("Email is required");
            emailref.current.focus();
            return;
        }

        if (!emailPattern.test(email)) {
            toast.error("Invalid email");
            emailref.current.select();
            return;
        }


        // Mobile
        if (!mobile.trim()) {
            toast.error("Mobile number is required");
            mobileref.current.focus();
            return;
        }

        if (!mobilenumberpattern.test(mobile)) {
            toast.error("Invalid Mobile Number");
            mobileref.current.focus();
            return;
        }


        // Gender
        if (!gender) {
            toast.error("Gender is required");
            return;
        }


        // Password
        if (!password.trim()) {
            toast.error("Password is required");
            passwordref.current.focus();
            return;
        }


        // Confirm Password
        if (!confirm.trim()) {
            toast.error("Confirm password is required");
            confirmref.current.focus();
            return;
        }


        // Password Match
        if (password !== confirm) {
            toast.error("Password and Confirm Password do not match");
            confirmref.current.select();
            return;
        }

        try {

            const response = await axios.post("http://localhost:5000/api/receptionist/registerreceptionist", {
                firstname,
                lastname,
                email,
                mobile,
                gender,
                password
            })

            let result = response.data;

            console.log(response.data);

            if (result.message === "Receptionist Registered") {
                toast.success("Receptionist Registered Successfully");

                setFirstName("");
                setLastName("");
                setEmail("");
                setMobile("");
                setGender("");
                setPassword("");
                setConfirm("");
            }

        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }



    };


    return (
        <>
            <AdminNavbar />

            <div className="container backcolor p-3">

                <h2 className="text-center mt-3">
                    Receptionist Registration
                </h2>


                {/* First Name */}
                <div className="my-3">

                    <label
                        htmlFor="firstname"
                        className="form-label fw-bold"
                    >
                        First Name :
                    </label>

                    <input
                        ref={firstnameref}
                        className="form-control"
                        type="text"
                        value={firstname}
                        id="firstname"
                        onChange={(event) =>
                            setFirstName(event.target.value)
                        }
                    />

                </div>


                {/* Last Name */}
                <div className="my-3">

                    <label
                        htmlFor="lastname"
                        className="fw-bold form-label"
                    >
                        Last Name :
                    </label>

                    <input
                        ref={lastnameref}
                        className="form-control"
                        type="text"
                        value={lastname}
                        id="lastname"
                        onChange={(event) =>
                            setLastName(event.target.value)
                        }
                    />

                </div>


                {/* Email */}
                <div className="my-3">

                    <label
                        htmlFor="eml"
                        className="fw-bold form-label"
                    >
                        Email :
                    </label>

                    <input
                        ref={emailref}
                        type="email"
                        id="eml"
                        className="form-control"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                    />

                </div>


                {/* Mobile */}
                <div className="my-3">

                    <label
                        htmlFor="mobile"
                        className="fw-bold form-label"
                    >
                        Mobile :
                    </label>

                    <input
                        ref={mobileref}
                        className="form-control"
                        type="tel"
                        maxLength={10}
                        value={mobile}
                        id="mobile"
                        onChange={(event) =>
                            setMobile(event.target.value)
                        }
                    />

                </div>


                {/* Gender */}
                <div>

                    <b>Gender : </b>

                    <div className="my-3">

                        <label htmlFor="male">
                            Male &nbsp;
                        </label>

                        <input
                            style={{ transform: "scale(1.2)" }}
                            type="radio"
                            onChange={(event) =>
                                setGender(event.target.value)
                            }
                            value="Male"
                            id="male"
                            name="gender"
                            checked={gender === "Male"}
                        />

                    </div>


                    <div className="my-3">

                        <label htmlFor="female">
                            Female &nbsp;
                        </label>

                        <input
                            style={{ transform: "scale(1.2)" }}
                            type="radio"
                            onChange={(event) =>
                                setGender(event.target.value)
                            }
                            checked={gender === "Female"}
                            value="Female"
                            name="gender"
                            id="female"
                        />

                    </div>

                </div>


                {/* Password */}
                <div className="my-3">

                    <label
                        htmlFor="password"
                        className="fw-bold form-label"
                    >
                        Password :
                    </label>

                    <input
                        ref={passwordref}
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        id="password"
                    />

                </div>


                {/* Confirm Password */}
                <div className="my-3">

                    <label
                        className="form-label fw-bold"
                        htmlFor="confirmPassword"
                    >
                        Confirm Password :
                    </label>

                    <input
                        ref={confirmref}
                        className="form-control"
                        type="password"
                        id="confirmPassword"
                        value={confirm}
                        onChange={(event) =>
                            setConfirm(event.target.value)
                        }
                    />

                </div>


                {/* Button */}
                <div className="text-center my-4">

                    <button
                        onClick={handleReceptionistRegister}
                        className="btn btn-primary px-5"
                    >
                        Register
                    </button>

                </div>

            </div>
        </>
    );
};

export default ReceptionistRegistration;