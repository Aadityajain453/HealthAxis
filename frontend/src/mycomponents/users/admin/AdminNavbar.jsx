import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function AdminNavbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Health Axis - Super Admin Panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={'/admin/dashboard'} >Dashoard</Nav.Link>

                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to={'/addadmin'} >Add Admin</NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={'/showadmin'} >Show Admins</NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item as={Link} to="/superadminprofile">
                                My Profile
                            </NavDropdown.Item>

                        </NavDropdown>

                        <NavDropdown title="Doctor" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to={'/adddoctor'} >Add Doctor</NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={'/showdoctor'} >Show Doctors</NavDropdown.Item>

                        </NavDropdown>

                        <NavDropdown title="Patient" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to={'/addpatient'} >Add Patient</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={'/showpatient'} >Show Patient</NavDropdown.Item>

                        </NavDropdown>

                        <NavDropdown title="Receptionist">
                            <NavDropdown.Item as={Link} to={'/receptionist_registration'}>Add Receptionist</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={'/show_receptionist_details'}>Show Receptionist</NavDropdown.Item>
                        </NavDropdown>


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminNavbar;