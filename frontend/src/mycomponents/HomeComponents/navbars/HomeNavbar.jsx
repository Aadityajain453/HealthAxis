import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, NavLink } from "react-router-dom";
import "../css/HomeNav.css";

export const HomeNavbar = () => {
  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="custom-navbar py-3"
      collapseOnSelect
    >
      <Container>

        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-2 brand-logo"
        >
          🏥 Health <span>Axis</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0 shadow-none"
        />

        <Navbar.Collapse id="basic-navbar-nav">

          {/* Center Links */}
          <Nav className="mx-auto">

            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>

            <Nav.Link as={NavLink} to="/service">
              Services
            </Nav.Link>

            <Nav.Link as={NavLink} to="/features">
              Features
            </Nav.Link>

            <Nav.Link as={NavLink} to="/doctor">
              Doctors
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>

          </Nav>

          {/* Right Buttons */}
          <div className="d-flex gap-2 mt-3 mt-lg-0">

            <Button
              as={Link}
              to="/login"
              variant="outline-primary"
              className="rounded-pill px-4 fw-semibold"
            >
              Login
            </Button>

            <Button
              as={Link}
              to="/patientreg"
              className="rounded-pill px-4 fw-semibold appointment-btn"
            >
              Get Started
            </Button>

          </div>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};