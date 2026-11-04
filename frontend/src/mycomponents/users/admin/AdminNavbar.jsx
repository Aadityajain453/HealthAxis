import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function AdminNavbar() {

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
                <Navbar.Brand>Health Axis - Super Admin Panel</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">

                        <Nav.Link as={Link} to="/admin/dashboard">
                            Dashboard
                        </Nav.Link>

                        <NavDropdown title="Admin" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/admin/addadmin">
                                Add Admin
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to="/admin/showadmin">
                                Show Admins
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item as={Link} to="/admin/superadminprofile">
                                My Profile
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Doctor" id="doctor-dropdown">
                            <NavDropdown.Item as={Link} to="/admin/adddoctor">
                                Add Doctor
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to="/admin/showdoctor">
                                Show Doctors
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Patient" id="patient-dropdown">
                            <NavDropdown.Item as={Link} to="/admin/addpatient">
                                Add Patient
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to="/admin/showpatient">
                                Show Patient
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Receptionist">
                            <NavDropdown.Item as={Link} to="/admin/receptionist_registration">
                                Add Receptionist
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to="/admin/show_receptionist_details">
                                Show Receptionist
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Appointment" id="appointment-dropdown">
                            <NavDropdown.Item as={Link} to="/admin/show_appointments">
                                Show Appointments
                            </NavDropdown.Item>
                        </NavDropdown>

                    </Nav>

                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                        disabled={loggingOut}
                    >
                        {loggingOut ? 'Logging out...' : 'Logout'}
                    </button>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminNavbar;
