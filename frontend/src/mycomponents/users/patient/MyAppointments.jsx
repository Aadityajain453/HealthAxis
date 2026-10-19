import { useState, useEffect } from "react";
import PatientNavbar from "./PatientNavbar";
import axios from "axios";
import { toast } from "react-toastify";

export const MyAppointment = () => {

    const [appointment, setAppointment] = useState([]);

    useEffect(() => {
        showAppointment();
    }, []);

    const showAppointment = async () => {
        try {

            const response = await axios.post(
                "http://localhost:5000/api/appointment/showAppointments", {}, { withCredentials: true }
            );

            console.log(response.data);


            setAppointment(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };


    const cancelAppointment = async (appointmentID) => {
        try {

            const response = await axios.put(
                "http://localhost:5000/api/appointment/cancelAppointment",
                {
                    appointmentID: appointmentID
                },
                {
                    withCredentials : true
                }
            );

            console.log(response.data);

            if (response.data.success) {

                toast.success("Appointment cancelled successfully");

                showAppointment();
            }

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <PatientNavbar />

            <div className="container mt-4">

                <h3 className="mb-4">
                    My Appointments
                </h3>

                {appointment.length === 0 ? (

                    <div className="alert alert-info">
                        No appointments found.
                    </div>

                ) : (

                    appointment.map((data) => (

                        <div
                            key={data.appointmentID}
                            className="card shadow-sm mb-4"
                        >

                            <div className="card-header bg-info text-white">
                                <h5 className="mb-0">
                                    Appointment ID: {data.appointmentID}
                                </h5>
                            </div>

                            <div className="card-body">

                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <strong>Patient ID:</strong>
                                        <div>{data.patientID}</div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>Doctor:</strong>
                                        <div>{data.doctorEmail}</div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>Date:</strong>
                                        <div>
                                            {new Date(
                                                data.appointmentDate
                                            ).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>Time:</strong>
                                        <div>{data.appointmentTime}</div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>Reason:</strong>
                                        <div>{data.reason}</div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <strong>Status:</strong>

                                        <div>
                                            <span
                                                className={
                                                    data.status === "Cancelled"
                                                        ? "badge bg-danger"
                                                        : data.status === "Confirmed"
                                                            ? "badge bg-success"
                                                            : "badge bg-warning text-dark"
                                                }
                                            >
                                                {data.status}
                                            </span>
                                        </div>

                                    </div>

                                </div>

                                {data.status !== "Cancelled" && (

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            cancelAppointment(
                                                data.appointmentID
                                            )
                                        }
                                    >
                                        Cancel Appointment
                                    </button>

                                )}

                            </div>

                        </div>

                    ))

                )}

            </div>
        </>
    );
};