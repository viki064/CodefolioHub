import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SocialMedia from "./socialmedia";
import logo from "../../staticComponents/logo.png";

function Footer() {
  return (
    <>
      <footer className="py-3 mt-3 bg-dark text-white">
        <Container>
          <Row xs={1} md={3} className="g-3 mt-1">
            <Col>
              <img
                src={logo}
                className="bg-white"
                alt="Logo"
                width="100"
                height="100"
              />
              {"  "}
              <a className="h4" href="#home">
                CodefolioHub
              </a>
            </Col>
            <Col>
              <h6>Location</h6>
              <p>Address of the company</p>
              <a className="h5" href="#contactus">
                Contact Us
              </a>
            </Col>
            <Col>
              <SocialMedia />
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
