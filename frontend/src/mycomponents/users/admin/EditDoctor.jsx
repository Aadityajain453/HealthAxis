import { useEffect, useRef, useState } from "react";
import AdminNavbar from "./AdminNavbar"
import { useNavigate, useParams } from "react-router-dom";
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

export const EditDoctor = () => {

    const { eml } = useParams();

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
    const [status, setStatus] = useState("");
    const [originalData, setOriginalData] = useState({});

    const navigate = useNavigate();

    useEffect(
        () => {
            fetchDoctor();
        },
        [eml]
    );


    const firstnameref = useRef(null);
    const lastnameref = useRef(null);
    const mobileref = useRef(null);
    const experienceref = useRef(null);
    const consultref = useRef(null);
    const statusref = useRef(null);


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

    const fetchDoctor = async () => {
        try {
            console.log("Email :", eml);
            const response = await axios.get(`http://localhost:5000/api/doctor/fetchDoctorData/${eml}`);


            let result = response.data;

            setFirstName(result.firstname);
            setLastName(result.lastname);
            setEmail(result.email);
            setMobile(result.mobile);
            setGender(result.gender);
            setDepartment(result.department);
            setSpecialization(result.specialization);
            setQualification(result.qualification);
            setExperience(result.experience);
            setConsultFee(result.consultation_fee);
            setStatus(result.status);

            setOriginalData({
                firstname: result.firstname,
                lastname: result.lastname,
                mobile: result.mobile,
                gender: result.gender,
                department: result.department,
                specialization: result.specialization,
                qualification: result.qualification,
                experience: String(result.experience),
                consultfee: String(result.consultation_fee),
                status: result.status
            });


        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while fetching doctor data");
        }
    }

    const handleUpdateData = async () => {

        const mobilenumberpattern = /^[6-9][0-9]{9}$/;


        if (!firstname.trim()) {
            toast.error("first name is required");
            firstnameref.current.focus();
            return;
        }
        if (handleNameValidation(firstname) === false) {
            toast.error("Must be enter only alphabets");
            firstnameref.current.focus();
            return;
        }
        if (!lastname.trim()) {
            toast.error("last name is required");
            lastnameref.current.focus();
            return;
        }
        if (handleNameValidation(lastname) === false) {
            toast.error("Must be enter only alphabets");
            lastnameref.current.focus();
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
        if (experience === "" || experience === null || experience === undefined) {
            toast.error("experience is required");
            experienceref.current.focus();
            return;
        }
        if (Number(experience) < 0) {
            toast.error("Experience cannot be negative");
            experienceref.current.focus();
            return;
        }
        if (consultfee === "" || consultfee === null || consultfee === undefined) {
            toast.error("consult fee is required");
            consultref.current.focus();
            return;
        }
        if (Number(consultfee) < 0) {
            toast.error("Consultation fee cannot be negative");
            consultref.current.focus();
            return;
        }
        if (!status) {
            toast.error("status is required");
            statusref.current.focus();
            return;
        }

        console.log("Original Data:", originalData);

        console.log("Current Data:", {
            firstname,
            lastname,
            mobile,
            gender,
            department,
            specialization,
            qualification,
            experience,
            consultfee,
            status
        });
            
        if (
            firstname === originalData.firstname &&
            lastname === originalData.lastname &&
            mobile === originalData.mobile &&
            gender === originalData.gender &&
            department === originalData.department &&
            specialization === originalData.specialization &&
            qualification === originalData.qualification &&
            String(experience) === String(originalData.experience) &&
            String(consultfee) === String(originalData.consultfee) &&
            status === originalData.status
        ) {
            toast.warning("No changes were made");
            return;
        }

        console.log("CHANGE DETECTED - API CALL STARTING");
        
        try {
            const response = await axios.put(`http://localhost:5000/api/doctor/updateDoctorData/${eml}`, {
                firstname, lastname, mobile, specialization, qualification, gender, department, experience, consultfee,
                status
            });

            let result = response.data;
            console.log("API response", result);

            if (result.message === "Doctor Data Updated Successfully") {
                toast.success("Data updated successfully");
                setTimeout(() => {
                    navigate('/showdoctor', { replace: true });
                }, 2000);

            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while updating doctor data");
        }
    }

    return (
        <>
            <AdminNavbar />
            <button onClick={() => navigate('/showdoctor', { replace: true })} className="btn btn-warning my-3 mx-5" style={{ float: "right" }}>back</button>
            <div className="container">
                <h2 className="text-center mt-4">Update Doctor Profile</h2>
                <div className="my-3">
                    <label htmlFor="firstname" className="fw-bold form-label">First Name :</label>
                    <input className="form-control" ref={firstnameref} value={firstname} id="firstname" type="text" onChange={(event) => setFirstName(event.target.value)} />
                </div>

                <div className="my-3">
                    <label htmlFor="lastname" className="fw-bold form-label">Last Name :</label>
                    <input className="form-control" ref={lastnameref} type="text" value={lastname} id="lastname" onChange={(event) => setLastName(event.target.value)} />
                </div>

                <div className="my-3">
                    <label className="fw-bold form-label">Email :</label>
                    <input className="form-control" readOnly type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
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

                <label className="form-label fw-bold my-3">Status :</label>
                <select
                    className="form-select"
                    ref={statusref}
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                >
                    <option value="" disabled>Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>

                <div className="text-center my-4">
                    <button onClick={handleUpdateData} className="btn btn-warning px-5">
                        Update
                    </button>
                </div>

            </div>

        </>
    )
}