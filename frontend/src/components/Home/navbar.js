import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import LoginSignup from "./logsign";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

function Navbarf() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar-custom shadow-sm"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="#home" className="brand-custom">
            <div className="d-flex align-items-center">
              <div className="brand-icon me-2">
                <FontAwesomeIcon icon={faCode} />
              </div>
              <span className="fw-bold">CodefolioHub</span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto me-4">
              <Nav.Link href="#home" className="nav-link-custom">
                Home
              </Nav.Link>
              <Nav.Link href="#ourservice" className="nav-link-custom">
                Services
              </Nav.Link>
              <Nav.Link href="#about" className="nav-link-custom">
                About
              </Nav.Link>
            </Nav>
            <Button
              variant="primary"
              className="btn-login"
              onClick={() => setModalShow(true)}
            >
              Get Started
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginSignup show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Navbarf;
