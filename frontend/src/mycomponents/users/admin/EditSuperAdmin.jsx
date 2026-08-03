import { useState } from "react";
import AdminNavbar from "./AdminNavbar"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";

export const EditSuperAdmin = () => {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");

    const { eml } = useParams();

    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const mobileRef = useRef(null);


    useEffect(
        () => {
            fetchSuperAdminData();
        },
        []
    );


    const fetchSuperAdminData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/getSuperAdminRecord/${eml}`);

            let result = response.data;
            console.log(result);

            setFirstName(result.firstName);
            setLastName(result.lastName);
            setMobile(result.mobile);
            setEmail(result.email);
            setGender(result.gender);
            setRole(result.role);


        } catch (error) {
            console.log(error);
        }
    }


    const handleSuperAdminUpdates = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/admin/updateSuperAdmin",
                {
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    mobile: mobile.trim(),
                    gender,
                    email,
                    role
                }
            )

            let ComingRecord = response.data;
            console.log(ComingRecord);

            if (ComingRecord.message === "SuperAdmin updated") {
                toast.success("Your Data updated successfully");
                setTimeout(() => {
                    navigate('/superadminprofile', { replace: true });
                }, 2000);

            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <AdminNavbar />
            <div className="container">

                <h2 className="text-center mt-3">Update SuperAdmin Profile</h2>
                <div className="my-3">
                    <label className="form-group fw-bold" htmlFor="name">First Name :</label>
                    <input className="form-control" type="text" id="name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                </div>

                <div className="my-3">
                    <label className="form-group fw-bold" htmlFor="last">Last Name :</label>
                    <input className="form-control" type="text" id="last" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                </div>

                <div className="my-3">
                    <label className="form-group fw-bold" htmlFor="eml">Email :</label>
                    <input className="form-control" type="email" readOnly id="eml" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div className="my-3">
                    <label className="form-group fw-bold" htmlFor="mob">Mobile-No :</label>
                    <input className="form-control" type="tel" maxLength={10} id="mob" value={mobile} onChange={(event) => setMobile(event.target.value)} />
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

                <div>
                    <label className="form-group fw-bold" htmlFor="rol">Role :</label>
                    <input readOnly className="form-control" type="text" id="rol" value={role} onChange={(event) => setRole(event.target.value)} />
                </div>

                <div className="text-center my-4">
                    <button onClick={handleSuperAdminUpdates} className="btn btn-dark px-5 ">
                        Update
                    </button>
                </div>

            </div>
        </>
    )
}