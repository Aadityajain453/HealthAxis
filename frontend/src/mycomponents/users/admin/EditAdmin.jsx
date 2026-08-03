import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "./AdminNavbar"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRef } from "react";

export const EditAdmin = () => {

    const { eml } = useParams();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");

    const navigate = useNavigate();
    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);

    const mobileRef = useRef(null);
    useEffect(
        () => {
            fetchAdmins();
        },
        [eml]
    );

    const isValidName = (str) => {

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

    const fetchAdmins = async () => {
        try {

            const response = await axios.get(`http://localhost:5000/api/admin/getSingleAdmin/${eml}`);

            console.log(response.data);

            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
            setMobile(response.data.mobile)
            setGender(response.data.gender)



        } catch (error) {
            console.log(error);
            toast.error("Failed to load admin data");
        }
    }

    const handleEditAdmin = async () => {

        const mobilePattern = /^[6-9][0-9]{9}$/

        if (!firstName.trim()) {
            toast.error("First Name is required");
            firstnameRef.current.focus();
            return;
        }
        if (!isValidName(firstName)) {
            toast.error("Please enter only alphabets");
            firstnameRef.current.select();
            return;
        }
        if (!lastName.trim()) {
            toast.error("Last Name is required");
            lastnameRef.current.focus();
            return;
        }
        if (!isValidName(lastName)) {
            toast.error("Please enter only alphabets");
            lastnameRef.current.select();
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
        try {
            const response = await axios.put("http://localhost:5000/api/admin/postUpdatedData", {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                mobile: mobile.trim(),
                gender,
                email
            });

            const result = response.data;
            console.log(result);


            if (result.message === "Admin updated successfully") {
                toast.success("Admin updated successfully");
                setTimeout(() => {
                    navigate("/showadmin", { replace: true });
                }, 2000);

            }
        } catch (error) {
            console.log(error);
            if (error.response?.status === 404) {
                toast.error("Admin not found");
            } else {
                toast.error("Something went wrong");
            }
        }
    }

    return (
        <>
            <AdminNavbar />
            <button onClick={() => navigate('/showadmin', { replace: true })} className="btn btn-secondary mx-5 my-3" style={{ float: "right" }}>back</button>
            <div className="container">

                <h2 className="text-center mt-3">Update Admin Profile</h2>
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
                    <input className="form-control" type="email" readOnly id="eml" value={email} onChange={(event) => setEmail(event.target.value)} />
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

                <div className="text-center my-4">
                    <button onClick={handleEditAdmin} className="btn btn-dark px-5 ">
                        Update
                    </button>
                </div>

            </div>
        </>
    )
}
