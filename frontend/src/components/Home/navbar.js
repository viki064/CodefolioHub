import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import LoginSignup from "./logsign";
import { useState } from "react";

function Navbarf() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary shadow-sm"
        sticky="top"
      >
        <Container>
          <div className="bg-black justify-content-center rounded">
            <a className="text-decoration-none" href="#home">
              <h3 className="text-white">CodefolioHub</h3>
            </a>
          </div>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto me-5">
              <Nav.Link href="#home" active>
                Home
              </Nav.Link>
              <Nav.Link href="#ourservice">Our Services</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button
            variant="outline-secondary"
            onClick={() => setModalShow(true)}
          >
            Login/SignUp
          </Button>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Container>
      </Navbar>

      <LoginSignup show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Navbarf;
