import { useEffect, useState } from 'react';
import axios from 'axios';
import ReceptionistNavbar from './ReceptionistNavbar';

const ReceptionistHome = () => {

    const [totalPatients, setTotalPatients] = useState(0);
    const [appointments, setAppointments] = useState([]);

    const [totalAppointments, setTotalAppointments] = useState(0);
    const [pendingAppointments, setPendingAppointments] = useState(0);
    const [confirmedAppointments, setConfirmedAppointments] = useState(0);

    const fetchDashboardData = async () => {

        try {

            // Fetch Patients
            const patientResponse = await axios.post(
                "http://localhost:5000/api/patient/fetchpatients"
            );

            setTotalPatients(patientResponse.data.length);


            // Fetch Appointments
            const appointmentResponse = await axios.post(
                "http://localhost:5000/api/appointment/showAppointments"
            );

            if (appointmentResponse.data.success) {

                const appointmentData = appointmentResponse.data.data;

                setAppointments(appointmentData);

                // Total Appointments
                setTotalAppointments(appointmentData.length);

                // Pending Appointments
                const pending = appointmentData.filter(
                    (appointment) => appointment.status === "Pending"
                );

                setPendingAppointments(pending.length);

                // Confirmed Appointments
                const confirmed = appointmentData.filter(
                    (appointment) => appointment.status === "Confirmed"
                );

                setConfirmedAppointments(confirmed.length);
            }

        } catch (error) {

            console.log("Dashboard Data Error:", error);

        }
    };


    const getStatusBadge = (status) => {

        if (status === "Pending") {
            return (
                <span className="badge bg-warning text-dark">
                    Pending
                </span>
            );
        }

        if (status === "Confirmed") {
            return (
                <span className="badge bg-primary">
                    Confirmed
                </span>
            );
        }

        if (status === "Completed") {
            return (
                <span className="badge bg-success">
                    Completed
                </span>
            );
        }

        if (status === "Cancelled") {
            return (
                <span className="badge bg-danger">
                    Cancelled
                </span>
            );
        }

        return (
            <span className="badge bg-secondary">
                {status}
            </span>
        );
    };

    useEffect(() => {

        fetchDashboardData();

    }, []);


    return (
        <>
            <ReceptionistNavbar />

            <div className="container mt-4">

                <h2 className="mb-4">
                    Receptionist Dashboard
                </h2>


                <div className="row g-4">

                    {/* Total Patients */}
                    <div className="col-md-6 col-lg-3">

                        <div className="card shadow-sm border-0 h-100">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Total Patients
                                </h6>

                                <h2 className="fw-bold">
                                    {totalPatients}
                                </h2>

                            </div>

                        </div>

                    </div>


                    {/* Total Appointments */}
                    <div className="col-md-6 col-lg-3">

                        <div className="card shadow-sm border-0 h-100">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Total Appointments
                                </h6>

                                <h2 className="fw-bold">
                                    {totalAppointments}
                                </h2>

                            </div>

                        </div>

                    </div>


                    {/* Pending Appointments */}
                    <div className="col-md-6 col-lg-3">

                        <div className="card shadow-sm border-0 h-100">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Pending Appointments
                                </h6>

                                <h2 className="fw-bold">
                                    {pendingAppointments}
                                </h2>

                            </div>

                        </div>

                    </div>


                    {/* Confirmed Appointments */}
                    <div className="col-md-6 col-lg-3">

                        <div className="card shadow-sm border-0 h-100">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Confirmed Appointments
                                </h6>

                                <h2 className="fw-bold">
                                    {confirmedAppointments}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow-sm border-0 mt-5">

                    <div className="card-body">

                        <h4 className="mb-4">
                            Recent Appointments
                        </h4>

                        {appointments.length === 0 ? (

                            <p className="text-muted">
                                No appointments found.
                            </p>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover">

                                    <thead className="table-light">

                                        <tr>
                                            <th>Appointment ID</th>
                                            <th>Patient ID</th>
                                            <th>Doctor Email</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {appointments.slice(0, 5).map((appointment) => (

                                            <tr key={appointment.appointmentID}>

                                                <td>
                                                    {appointment.appointmentID}
                                                </td>

                                                <td>
                                                    {appointment.patientID}
                                                </td>

                                                <td>
                                                    {appointment.doctorEmail}
                                                </td>

                                                <td>
                                                    {appointment.appointmentDate}
                                                </td>

                                                <td>
                                                    {appointment.appointmentTime}
                                                </td>

                                                <td>
                                                    {getStatusBadge(appointment.status)}
                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </div>
        </>
    );
};

export default ReceptionistHome;

