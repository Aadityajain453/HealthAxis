import { useRef, useState } from "react"
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { toast } from "react-toastify";


const specializationData = {
    Cardiology: [
        "Interventional Cardiology",
        "Clinical Cardiology",
        "Pediatric Cardiology"
    ],

    Neurology: [
        "Clinical Neurology",
        "Pediatric Neurology",
        "Neurological Surgery"
    ],

    Orthopedics: [
        "Spine Surgery",
        "Joint Replacement",
        "Sports Medicine"
    ],

    Pediatrics: [
        "Neonatology",
        "Pediatric Cardiology",
        "Pediatric Neurology"
    ],

    Dermatology: [
        "Cosmetic Dermatology",
        "Clinical Dermatology"
    ],

    ENT: [
        "Otology",
        "Rhinology",
        "Laryngology"
    ],

    Ophthalmology: [
        "Retina Specialist",
        "Cornea Specialist",
        "Glaucoma Specialist"
    ],

    Gynecology: [
        "Obstetrics",
        "Reproductive Medicine",
        "Reproductive Endocrinology"
    ],

    "General Medicine": [
        "Internal Medicine",
        "Diabetology"
    ],

    "General Surgery": [
        "Laparoscopic Surgery",
        "Colorectal Surgery"
    ]
};

const DoctorRegistration = () => {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [department, setDepartment] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [qualification, setQualification] = useState("");
    const [experience, setExperience] = useState("");
    const [consultfee, setConsultFee] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const firstnameref = useRef(null);
    const lastnameref = useRef(null);
    const emailref = useRef(null);
    const mobileref = useRef(null);
    const experienceref = useRef(null);
    const consultref = useRef(null);
    const passwordref = useRef(null);
    const confirmref = useRef(null);

    const handleNameValidation = (str) => {

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

    const handleDoctorRegister = async () => {

        const mobilenumberpattern = /^[6-9][0-9]{9}$/;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstname.trim()) {
            toast.error("first name is required");
            firstnameref.current.focus();
            return;
        }
        if (handleNameValidation(firstname) === false) {
            toast.error("Must be enter only alphabets");
            firstnameref.current.select();
            return;
        }
        if (!lastname.trim()) {
            toast.error("last name is required");
            lastnameref.current.focus();
            return;
        }
        if (handleNameValidation(lastname) === false) {
            toast.error("Must be enter only alphabets");
            lastnameref.current.select();
            return;
        }
        if (!email.trim()) {
            toast.error("email is required");
            emailref.current.focus();
            return;
        }
        if (!emailPattern.test(email)) {
            toast.error("Invalid email");
            emailref.current.select();
            return;
        }
        if (!mobile.trim()) {
            toast.error("mobile number is required");
            mobileref.current.focus();
            return;
        }
        if (!mobilenumberpattern.test(mobile)) {
            toast.error("Invalid Mobile Number");
            mobileref.current.focus();
            return;
        }
        if (!gender) {
            toast.error("Gender is required");
            return;
        }
        if (!department) {
            toast.error("Department is required");
            return;
        }
        if (!specialization) {
            toast.error("Specialization is required");
            return;
        }
        if (!qualification) {
            toast.error("Qualification is required");
            return;
        }
        if (!experience.trim()) {
            toast.error("experience is required");
            experienceref.current.focus();
            return;
        }
        if (!consultfee.trim()) {
            toast.error("consult fee is required");
            consultref.current.focus();
            return;
        }
        if (!password.trim()) {
            toast.error("password is required");
            passwordref.current.focus();
            return;
        }
        if (!confirm.trim()) {
            toast.error("confirm password is required");
            confirmref.current.focus();
            return;
        }
        if (password !== confirm) {
            toast.error("Password and Confirm Password do not match");
            confirmref.current.select();
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/doctor/registerdoctor', {
                firstname, lastname, email, mobile, gender, department, specialization, qualification, experience, consultfee, password
            });

            let result = response.data;
            console.log(result);

            if (result.message === "Doctor Registered") {
                toast.success("Doctor Registered");
                setFirstName("");
                setLastName("");
                setEmail("");
                setMobile("");
                setSpecialization("");
                setQualification("");
                setGender("");
                setDepartment("");
                setExperience("");
                setConsultFee("");
                setPassword("");
                setConfirm("");
            }

        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }


    return (
        <>
            <AdminNavbar />
            <div className="container backcolor p-3 ">
                <h2 className="text-center mt-3">Doctor Registration</h2>
                <div className="my-3">
                    <label htmlFor="firstname" className=" form-label fw-bold">First Name :</label>
                    <input ref={firstnameref} className="form-control" type="text" value={firstname} id="firstname" onChange={(event) => setFirstName(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="lastname" className="fw-bold form-label">Last Name :</label>
                    <input ref={lastnameref} className="form-control" type="text" value={lastname} id="lastname" onChange={(event) => setLastName(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="eml" className="fw-bold form-label" >Email :</label>
                    <input ref={emailref} type="email" id="eml" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="mobile" className="fw-bold form-label">Mobile :</label>
                    <input ref={mobileref} className="form-control" type="tel" maxLength={10} value={mobile} id="mobile" onChange={(event) => setMobile(event.target.value)} />
                </div>

                <div>
                    <b>Gender : </b>
                    <div className="my-3">
                        <label htmlFor="male" >Male &nbsp;</label>
                        <input style={{ transform: "scale(1.2)" }} type="radio" onChange={(event) => setGender(event.target.value)} value={"Male"} id="male" name="gender" checked={gender === "Male"} />
                    </div>

                    <div className="my-3">
                        <label htmlFor="female">Female &nbsp;</label>
                        <input style={{ transform: "scale(1.2)" }} type="radio" onChange={(event) => setGender(event.target.value)} checked={gender === "Female"} value={"Female"} name="gender" id="female" />
                    </div>
                </div>

                <label className="form-label fw-bold my-3">Department :</label>

                <select
                    className="form-select"
                    value={department}
                    onChange={(event) => { setDepartment(event.target.value); setSpecialization(""); }}  >

                    <option value="" disabled>Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="ENT">ENT</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="General Surgery">General Surgery</option>

                </select>

                <label className=" form-label fw-bold my-3">Specialization :</label>

                <select
                    className="form-select"
                    onChange={(event) => setSpecialization(event.target.value)}
                    value={specialization}
                    disabled={!department}

                >

                    <option value="" disabled>Select Specialization</option>

                    {department && specializationData[department].map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}

                </select>

                <label className="form-label fw-bold my-3">Qualification :</label>

                <select className="form-select" value={qualification} onChange={(event) => setQualification(event.target.value)}>
                    <option value="" disabled>Select Qualification</option>
                    <option value="MBBS">MBBS</option>
                    <option value="MD">MD</option>
                    <option value="MS">MS</option>
                    <option value="DNB">DNB</option>
                    <option value="DM">DM</option>
                    <option value="MCh">MCh</option>
                    <option value="BDS">BDS</option>
                    <option value="MDS">MDS</option>
                </select>

                <div className="my-3">
                    <label htmlFor="experience" className="fw-bold form-label" >Experience :</label>
                    <input ref={experienceref} className="form-control" min="0" type="number" value={experience} id="experience" onChange={(event) => setExperience(event.target.value)} />
                </div>

                <div className="my-3">
                    <label className="form-label fw-bold" htmlFor="fee">
                        Consultation Fee :
                    </label>

                    <input
                        ref={consultref}
                        className="form-control"
                        type="number"
                        min="0"
                        id="fee"
                        value={consultfee}
                        onChange={(event) => setConsultFee(event.target.value)}
                    />
                </div>


                <div className="my-3">
                    <label htmlFor="password" className="fw-bold form-label">Password :</label>
                    <input
                        ref={passwordref}
                        className="form-control"
                        type="text"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        id="password" />
                </div>

                <div className="my-3">
                    <label className="form-label fw-bold" htmlFor="confirmPassword">
                        Confirm Password :
                    </label>

                    <input
                        ref={confirmref}
                        className="form-control"
                        type="text"
                        id="confirmPassword"
                        value={confirm}
                        onChange={(event) => setConfirm(event.target.value)}
                    />
                </div>

                <div className="text-center my-4">
                    <button onClick={handleDoctorRegister} className="btn btn-primary px-5">
                        Register
                    </button>
                </div>

            </div >
        </>
    )
}
export default DoctorRegistration;