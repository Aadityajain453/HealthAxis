import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import DoctorNavbar from './DoctorNavbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showPatientModal, setShowPatientModal] = useState(false);


    const handleViewPatient = (patient) => {
        setSelectedPatient(patient);
        setShowPatientModal(true);
    };

    const handleUpdateStatus = async (appointmentID, status) => {
        try {
            const response = await axios.put(
                'http://localhost:5000/api/appointment/updateAppointmentStatus',
                { appointmentID, status },
                { withCredentials: true }
            );

            if (response.data.success) {
                setAppointments((prevAppointments) =>
                    prevAppointments.map((appointment) =>
                        appointment.appointmentID === appointmentID
                            ? { ...appointment, status }
                            : appointment
                    )
                );
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Failed to update appointment status'
            );
        }
    };

    useEffect(() => {
        axios.post(
            'http://localhost:5000/api/appointment/showAppointments',
            {},
            { withCredentials: true }
        )

            .then((response) => {
                if (response.data.success) {
                    setAppointments(response.data.data || []);
                    console.log(response.data.data);
                } else {
                    setError(response.data.message || 'Unable to fetch appointments.');
                }
            })
            .catch((err) => {
                setError(
                    err.response?.data?.message ||
                    'Failed to load appointments.'
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <DoctorNavbar />

            <Container className="mt-4">
                <h2 className="mb-4">My Appointments</h2>

                {loading && (
                    <Spinner animation="border" />
                )}

                {error && (
                    <Alert variant="danger">{error}</Alert>
                )}

                {!loading && !error && appointments.length === 0 && (
                    <Alert variant="info">
                        No appointments found.
                    </Alert>
                )}

                {!loading && !error && appointments.length > 0 && (
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>Appointment ID</th>
                                <th>Patient ID</th>
                                <th>Patient Name</th>
                                <th>Patient Email</th>
                                <th>Patient Mobile</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{appointment.appointmentID}</td>
                                    <td>{appointment.patientID}</td>
                                    <td>
                                        {appointment.patient
                                            ? `${appointment.patient.firstname} ${appointment.patient.lastname}`
                                            : 'N/A'}
                                    </td>

                                    <td>{appointment.patient?.email || 'N/A'}</td>

                                    <td>{appointment.patient?.mobile || 'N/A'}</td>
                                    <td>
                                        {appointment.appointmentDate
                                            ? new Date(appointment.appointmentDate).toLocaleDateString()
                                            : ''}
                                    </td>
                                    <td>{appointment.appointmentTime}</td>
                                    <td>{appointment.reason}</td>
                                    <td>{appointment.status}</td>
                                    <td>
                                        <Button
                                            variant="info"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleViewPatient(appointment.patient)}
                                            disabled={!appointment.patient}
                                        >
                                            View
                                        </Button>

                                        {appointment.status === 'Pending' && (

                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        appointment.appointmentID,
                                                        'Confirmed'
                                                    )
                                                }
                                            >
                                                Confirm
                                            </button>
                                        )}

                                        {appointment.status === 'Confirmed' && (
                                            <button
                                                className="btn btn-primary btn-sm me-2"
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        appointment.appointmentID,
                                                        'Completed'
                                                    )
                                                }
                                            >
                                                Complete
                                            </button>
                                        )}

                                        {appointment.status !== 'Cancelled' &&
                                            appointment.status !== 'Completed' && (
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={async () => {
                                                        try {
                                                            const response = await axios.put(
                                                                'http://localhost:5000/api/appointment/cancelAppointment',
                                                                { appointmentID: appointment.appointmentID },
                                                                { withCredentials: true }
                                                            );

                                                            if (response.data.success) {
                                                                setAppointments((prev) =>
                                                                    prev.map((item) =>
                                                                        item.appointmentID === appointment.appointmentID
                                                                            ? { ...item, status: 'Cancelled' }
                                                                            : item
                                                                    )
                                                                );
                                                            }
                                                        } catch (error) {
                                                            alert(
                                                                error.response?.data?.message ||
                                                                'Failed to cancel appointment'
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

                <Modal
                    show={showPatientModal}
                    onHide={() => setShowPatientModal(false)}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Patient Details</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {selectedPatient && (
                            <>
                                <p><strong>Patient ID:</strong> {selectedPatient.patientID || 'N/A'}</p>
                                <p><strong>Name:</strong> {selectedPatient.firstname} {selectedPatient.lastname}</p>
                                <p><strong>Email:</strong> {selectedPatient.email || 'N/A'}</p>
                                <p><strong>Mobile:</strong> {selectedPatient.mobile || 'N/A'}</p>
                                <p><strong>Date of Birth:</strong> {selectedPatient.dob ? new Date(selectedPatient.dob).toLocaleDateString() : 'N/A'}</p>
                                <p><strong>Gender:</strong> {selectedPatient.gender || 'N/A'}</p>
                                <p><strong>Blood Group:</strong> {selectedPatient.bloodgroup || 'N/A'}</p>
                                <p><strong>Address:</strong> {selectedPatient.address || 'N/A'}</p>
                                <p><strong>City:</strong> {selectedPatient.city || 'N/A'}</p>
                                <p><strong>State:</strong> {selectedPatient.state || 'N/A'}</p>
                                <p><strong>Pincode:</strong> {selectedPatient.pincode || 'N/A'}</p>
                            </>
                        )}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowPatientModal(false)}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};

export default DoctorAppointments;