
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const ReceptionistNavbar = () => {

    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setLoggingOut(true);

            const response = await axios.post(
                'http://localhost:5000/api/login/logout',
                {},
                { withCredentials: true }
            );

            if (response.data.success) {
                navigate('/login', { replace: true });
            }

        } catch (error) {
            console.log('Logout Error:', error);
            alert('Logout failed. Please try again.');

        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>

                <Navbar.Brand as={Link} to="/">
                    HealthAxis
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="receptionist-navbar" />

                <Navbar.Collapse id="receptionist-navbar">

                    <Nav className="me-auto">

                        <Nav.Link as={Link} to="/receptionist">
                            Home
                        </Nav.Link>

                        <Nav.Link as={Link} to="/receptionist/appointments">
                            Appointments
                        </Nav.Link>

                        <Nav.Link as={Link} to="/receptionist/patients">
                            Patients
                        </Nav.Link>

                    </Nav>

                    <Nav>
                        <Nav.Link
                            onClick={handleLogout}
                            disabled={loggingOut}
                        >
                            {loggingOut ? 'Logging out...' : 'Logout'}
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default ReceptionistNavbar;
