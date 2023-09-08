import React from "react";
import image_logo from "../../staticComponents/logo.png";
import { Card, Col, Row } from "react-bootstrap";

function Aboutus() {
  return (
    <>
      <div id="about">
        <Card className="text-center border-0">
          <Card.Body>
            <h3>ABOUT</h3>
          </Card.Body>
        </Card>
        <Row xs={1} md={2} className="g-4 mb-2">
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
            <Card
              className="border-0 mt-5 pt-5"
              style={{ height: "26rem", width: "28rem" }}
            >
              <Card.Body>
                <Card.Title className="text-decoration-underline">
                  What we do:
                </Card.Title>
                <p>
                  We provide the templates for your portfolios and also you host
                  it with less price.
                </p>
                <Card.Title className="text-decoration-underline">
                  What you have to do:
                </Card.Title>
                <p>
                  Create Professional Portfolios here to show yourself to the
                  recruiters and get hired.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Aboutus;
