
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import DoctorNavbar from './DoctorNavbar';
import axios from 'axios';

const DoctorHome = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.post(
            'http://localhost:5000/api/appointment/showAppointments',
            {},
            { withCredentials: true }
        )
            .then((response) => {
                if (response.data.success) {
                    setAppointments(response.data.data || []);
                } else {
                    setError(
                        response.data.message ||
                        'Unable to fetch appointments.'
                    );
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

    const totalAppointments = appointments.length;

    const pendingAppointments = appointments.filter(
        (appointment) => appointment.status === 'Pending'
    ).length;

    const confirmedAppointments = appointments.filter(
        (appointment) => appointment.status === 'Confirmed'
    ).length;

    const completedAppointments = appointments.filter(
        (appointment) => appointment.status === 'Completed'
    ).length;

    const cancelledAppointments = appointments.filter(
        (appointment) => appointment.status === 'Cancelled'
    ).length;

    const recentAppointments = [...appointments]
        .sort(
            (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
        )
        .slice(0, 5);

    return (
        <>
            <DoctorNavbar />

            <Container className="mt-4 mb-5">
                <Card className="shadow-sm mb-4">
                    <Card.Body>
                        <h2>Doctor Dashboard</h2>
                        <p className="mb-0">
                            Welcome to the HealthAxis Doctor Panel.
                        </p>
                    </Card.Body>
                </Card>

                {loading && (
                    <div className="text-center mt-4">
                        <Spinner animation="border" />
                        <p className="mt-2">Loading dashboard...</p>
                    </div>
                )}

                {error && (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                )}

                {!loading && !error && (
                    <>
                        <Row className="g-3 mb-4">
                            <Col md={6} lg={4}>
                                <Card className="shadow-sm h-100">
                                    <Card.Body>
                                        <h6>Total Appointments</h6>
                                        <h2>{totalAppointments}</h2>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={6} lg={4}>
                                <Card className="shadow-sm h-100">
                                    <Card.Body>
                                        <h6>Pending Appointments</h6>
                                        <h2>{pendingAppointments}</h2>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={6} lg={4}>
                                <Card className="shadow-sm h-100">
                                    <Card.Body>
                                        <h6>Confirmed Appointments</h6>
                                        <h2>{confirmedAppointments}</h2>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={6} lg={4}>
                                <Card className="shadow-sm h-100">
                                    <Card.Body>
                                        <h6>Completed Appointments</h6>
                                        <h2>{completedAppointments}</h2>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={6} lg={4}>
                                <Card className="shadow-sm h-100">
                                    <Card.Body>
                                        <h6>Cancelled Appointments</h6>
                                        <h2>{cancelledAppointments}</h2>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Card className="shadow-sm">
                            <Card.Body>
                                <h4 className="mb-3">
                                    Recent Appointments
                                </h4>

                                {recentAppointments.length === 0 ? (
                                    <Alert variant="info" className="mb-0">
                                        No appointments found.
                                    </Alert>
                                ) : (
                                    <Table responsive striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Appointment ID</th>
                                                <th>Patient Name</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {recentAppointments.map((appointment) => (
                                                <tr key={appointment._id}>
                                                    <td>{appointment.appointmentID}</td>

                                                    <td>
                                                        {appointment.patient
                                                            ? `${appointment.patient.firstname} ${appointment.patient.lastname}`
                                                            : 'N/A'}
                                                    </td>

                                                    <td>
                                                        {appointment.appointmentDate
                                                            ? new Date(
                                                                appointment.appointmentDate
                                                            ).toLocaleDateString()
                                                            : 'N/A'}
                                                    </td>

                                                    <td>
                                                        {appointment.appointmentTime || 'N/A'}
                                                    </td>

                                                    <td>{appointment.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Card.Body>
                        </Card>
                    </>
                )}
            </Container>
        </>
    );
};

export default DoctorHome;
