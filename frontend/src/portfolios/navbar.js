import { Container, Navbar, Nav } from "react-bootstrap";
import "./navBar.css";
import Contact from "./contact";

function Navbarf() {
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
              <Nav.Link href="#home">About</Nav.Link>
              <Nav.Link href="#skills">Skills</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#acheivements">Acheivements</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Contact />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarf;
