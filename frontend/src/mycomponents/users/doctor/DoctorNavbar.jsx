
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const DoctorNavbar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/doctor/home">
                    HealthAxis
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="doctor-navbar" />

                <Navbar.Collapse id="doctor-navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/doctor/home">
                            Dashboard
                        </Nav.Link>

                        <Nav.Link as={Link} to="/doctor/appointments">
                            My Appointments
                        </Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link as={Link} to="/login">
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default DoctorNavbar;
