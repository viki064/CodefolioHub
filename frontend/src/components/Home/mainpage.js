import React from "react";
import image_logo from "../../staticComponents/logo.png";
import { Col, Container, Row, Card } from "react-bootstrap";
import Ourservices from "./ourservices";
import Aboutus from "./about";

function Mainpage() {
  return (
    <>
      <div id="home">
        <Container>
          <Row xs={1} md={2} className="g-4 mt-3">
            <Col>
              <Card className="mb-3 ps-4 border-0">
                <Card.Img
                  style={{ height: "26rem", width: "28rem" }}
                  variant="top"
                  src={image_logo}
                />
              </Card>
            </Col>
            <Col>
              <Card className="mt-5 p-3 border-0">
                <Card.Body>
                  <Card.Title className="text-decoration-underline">
                    Create your portfolio like a PRO with CodefolioHub
                  </Card.Title>
                  <br />
                  <Card.Text>
                    Change your themes whenever you want.
                    <hr />
                    <p>Make your portfolio publicly active.</p>
                    <hr />
                    <p>
                      <mark className="h6 bg-info">Update: </mark>
                      Create custom portfolios using drag and drop component.
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Ourservices />
          <Aboutus />
        </Container>
      </div>
    </>
  );
}

export default Mainpage;
