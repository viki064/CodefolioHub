import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <>
      <footer className="py-2 mt-3 bg-dark text-white shadow-sm border-top border-1 border-info">
        <Container>
          <Row className="g-3 mt-1">
            <Col>
              <h6>@copyright by CodefolioHub</h6>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
