import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Badge, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ReceptionistNavbar from './ReceptionistNavbar';

const ReceptionistAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all appointments
    const fetchAppointments = async () => {
        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/appointment/showAppointments", {}, { withCredentials: true }
            );

            if (response.data.success) {
                setAppointments(response.data.data);
            }

        } catch (error) {

            console.log("Fetch Appointments Error:", error);

            toast.error("Unable to fetch appointments");

        } finally {
            setLoading(false);
        }
    };


    // Update appointment status
    // const updateStatus = async (appointmentID, status) => {

    //     try {

    //         const response = await axios.put(
    //             "http://localhost:5000/api/appointment/updateAppointmentStatus",
    //             {
    //                 appointmentID: appointmentID,
    //                 status: status
    //             },
    //             {
    //                 withCredentials : true
    //             }
    //         );

    //         if (response.data.success) {

    //             toast.success(`Appointment ${status}`);

    //             fetchAppointments();
    //         }

    //     } catch (error) {

    //         console.log("Update Status Error:", error);

    //         toast.error("Unable to update appointment status");
    //     }
    // };


    // Cancel appointment
    // const cancelAppointment = async (appointmentID) => {

    //     try {

    //         const response = await axios.put(
    //             "http://localhost:5000/api/appointment/cancelAppointment",
    //             {
    //                 appointmentID: appointmentID
    //             },
    //             {
    //                 withCredentials : true
    //             }
    //         );

    //         if (response.data.success) {

    //             toast.success("Appointment cancelled successfully");

    //             fetchAppointments();
    //         }

    //     } catch (error) {

    //         console.log("Cancel Appointment Error:", error);

    //         toast.error("Unable to cancel appointment");
    //     }
    // };


    // Fetch appointments when component loads
    useEffect(() => {
        fetchAppointments();
    }, []);


    // Status badge
    const getStatusBadge = (status) => {

        if (status === "Pending") {
            return <Badge bg="warning" text="dark">Pending</Badge>;
        }

        if (status === "Confirmed") {
            return <Badge bg="primary">Confirmed</Badge>;
        }

        if (status === "Completed") {
            return <Badge bg="success">Completed</Badge>;
        }

        if (status === "Cancelled") {
            return <Badge bg="danger">Cancelled</Badge>;
        }

        return <Badge bg="secondary">{status}</Badge>;
    };


    return (

        <>
            <ReceptionistNavbar />
            <Container className="mt-4">

                <h2 className="mb-4">
                    Receptionist Appointments
                </h2>


                {loading ? (

                    <p>Loading appointments...</p>

                ) : appointments.length === 0 ? (

                    <p>No appointments found.</p>

                ) : (

                    <Table responsive bordered hover>

                        <thead className="table-light">

                            <tr>

                                <th>Appointment ID</th>

                                <th>Patient ID</th>

                                <th>Doctor Email</th>

                                <th>Date</th>

                                <th>Time</th>

                                <th>Reason</th>

                                <th>Appointment Status</th>

                            </tr>

                        </thead>


                        <tbody>

                            {appointments.map((appointment) => (

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
                                        {appointment.reason}
                                    </td>

                                    <td>
                                        {getStatusBadge(appointment.status)}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </Table>

                )}

            </Container>

        </>

    );
};

export default ReceptionistAppointments;