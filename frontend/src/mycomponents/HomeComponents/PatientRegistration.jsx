import { useState } from "react";
import { HomeNavbar } from "./navbars/HomeNavbar";
import './css/Patient.css';
import axios from 'axios';

export const PatientRegistration = () => {

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
    const [register, setRegister] = useState("");


    const handlePatientRegistration = async () =>{
        try{
            const response = await axios.post("http://localhost:5000/api/patient/patientreg" , {
                firstname, lastname, email, mobile, dob, gender, bloodgroup, address, city, state, pincode, password 
            })

            let ComingRecord = await response.data;
            console.log(ComingRecord);

            if(ComingRecord.message === "Patient registered successfully"){
                
                setRegister("Registration successfully");
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

        }catch(error){
            console.log(error);
        }
    }


    return (
        <>
            <HomeNavbar />
            <div className="container backcolor p-3">
                <div className="my-3">
                    <label htmlFor="first" className="fw-bold">First Name :</label>
                    <input className="form-control " type="text" id="first" value={firstname} placeholder="your first name" onChange={(event) => setFirstName(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="last" className="fw-bold">Last Name :</label>
                    <input className="form-control" type="text" id="last" value={lastname} placeholder="your last name" onChange={(event) => setLastName(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="eml" className="fw-bold">Email :</label>
                    <input className="form-control" type="text" id="eml" value={email} placeholder="your email" onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="mbno" className="fw-bold">Mobile No. :</label>
                    <input className="form-control" type="text" id="mbno" value={mobile} placeholder="your mobile number" onChange={(event) => setMobile(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="db" className="fw-bold">Date of birth :</label>
                    <input className="form-control" type="date" id="db" value={dob} onChange={(event) => setDOB(event.target.value)} />
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
                    <input className="form-control" type="text" id="lbl" value={bloodgroup} placeholder="A+" onChange={(event) => setBloodGroup(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="addr" className="fw-bold">Address :</label>
                    <input className="form-control" type="text" id="addr" value={address} placeholder="full address" onChange={(event) => setAddress(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="cy" className="fw-bold">City:</label>
                    <input className="form-control" type="text" id="cy" value={city} placeholder="your city" onChange={(event) => setCity(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="st" className="fw-bold">State:</label>
                    <input className="form-control" type="text" id="st" value={state} placeholder="your state" onChange={(event) => setState(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="pin" className="fw-bold">Pin Code :</label>
                    <input className="form-control" type="text" id="pin" value={pincode} placeholder="your pin code " onChange={(event) => setPincode(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="pas" className="fw-bold">Password :</label>
                    <input className="form-control" type="text" id="pas" value={password} placeholder="your password" onChange={(event) => setPassword(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="cpas" className="fw-bold">Mobile No. :</label>
                    <input className="form-control" type="text" id="cpas" value={confirmpassword} placeholder="your confirm password" onChange={(event) => setConfirmPassword(event.target.value)} />
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