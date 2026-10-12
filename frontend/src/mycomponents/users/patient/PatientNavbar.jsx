import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';

function PatientNavbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>

                <Navbar.Brand as={Link} to="/">
                    HealthAxis
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">

                    {/* Left Side Links */}
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/patient/home">
                            Home
                        </Nav.Link>

                        <Nav.Link as={Link} to="/book-appointment">
                            Book Appointment
                        </Nav.Link>

                        <Nav.Link as={Link} to="/my-appointment">
                            My Appointment
                        </Nav.Link>

                        <Nav.Link as={Link} to="/myprofile">
                            My Profile
                        </Nav.Link>
                    </Nav>

                    {/* Right Side */}
                    <Nav>
                        <Nav.Link as={Link} to="/">
                            Logout
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default PatientNavbar;