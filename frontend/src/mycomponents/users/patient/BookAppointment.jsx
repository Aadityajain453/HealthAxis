import { toast } from "react-toastify";
import PatientNavbar from "./PatientNavbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const BookAppointment = () => {


    const [doctoremail, setDoctorEmail] = useState("");
    const [appointmentdate, setAppointmentDate] = useState("");
    const [appointmenttime, setAppointmentTime] = useState("");
    const [reason, setReason] = useState("");
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, [])


    const fetchDoctors = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/doctor/showdoctors")

            console.log(response.data)
            setDoctors(response.data);

        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = async () => {

        if (!doctoremail || !appointmentdate || !appointmenttime || !reason) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5000/api/appointment/createAppointment",
                {
                    patientID: "PAT1001",
                    doctorEmail: doctoremail,
                    appointmentDate: appointmentdate,
                    appointmentTime: appointmenttime,
                    reason: reason,
                    createdBy: "Patient"
                }
            );

            console.log(response.data);

            toast.success("Appointment booked successfully");
            setDoctorEmail("");
            setAppointmentDate("");
            setAppointmentTime("");
            setReason("");

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <PatientNavbar />

            <div className="container mt-4">

                <div className="card shadow-sm">

                    <div className="card-body p-4">

                        <h3 className="text-primary mb-4">
                            Book Appointment
                        </h3>

                        {/* Doctor */}
                        <div className="mb-3">
                            <label className="form-label">
                                Select Doctor
                            </label>

                            <select
                                className="form-select"
                                value={doctoremail}
                                onChange={(e) =>
                                    setDoctorEmail(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select Doctor
                                </option>

                                {doctors.map((doctor) => (
                                    <option
                                        key={doctor.email}
                                        value={doctor.email}
                                    >
                                        Dr. {doctor.firstname} {doctor.lastname}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* Date */}
                        <div className="mb-3">
                            <label className="form-label">
                                Appointment Date
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                value={appointmentdate}
                                onChange={(e) =>
                                    setAppointmentDate(e.target.value)
                                }
                            />
                        </div>


                        {/* Time */}
                        <div className="mb-3">
                            <label className="form-label">
                                Appointment Time
                            </label>

                            <input
                                type="time"
                                className="form-control"
                                value={appointmenttime}
                                onChange={(e) =>
                                    setAppointmentTime(e.target.value)
                                }
                            />
                        </div>


                        {/* Reason */}
                        <div className="mb-3">
                            <label className="form-label">
                                Reason
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                value={reason}
                                onChange={(e) =>
                                    setReason(e.target.value)
                                }
                                placeholder="Enter reason for appointment"
                            ></textarea>
                        </div>


                        {/* Button */}
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Book Appointment
                        </button>

                    </div>

                </div>

            </div>
        </>
    );

};

export default BookAppointment;