import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const ReceptionistNavbar = () => {
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
            <Nav.Link as={Link} to="/logout">
              Logout
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ReceptionistNavbar;