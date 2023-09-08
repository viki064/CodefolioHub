import React from "react";
import { useState } from "react";
import image_logo from "../../staticComponents/logo.png";
import {
  Card,
  Carousel,
  Col,
  Container,
  Row,
  Form,
  Button,
} from "react-bootstrap";

function Ourservices() {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [themes, setThemes] = useState(["Theme 1", "Theme 2", "Theme 3"]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Handle file upload logic here
    console.log(selectedFile);
  };
  return (
    <>
      <div id="ourservice">
        <Card className="text-center border-0">
          <Card.Body>
            <h3>OUR SERVICES</h3>
          </Card.Body>
        </Card>
        <Row xs={1} md={2} className="g-4 mb-2">
          <Col>
            <Card
              className="border-0 mt-5 pt-5"
              style={{ height: "26rem", width: "28rem" }}
            >
              <Card.Body>
                <Card.Title className="text-decoration-underline">
                  Test your portfolio by uploading your resume for free:
                </Card.Title>
                <br />
                <Container>
                  <Form>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleUpload}>
                      Upload
                    </Button>
                  </Form>
                </Container>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="border-0 text-center text-decoration-underline">
              <Card.Title>
                Select from the pool of themes for your portfolio
              </Card.Title>
            </Card>
            <Card className="border-0">
              <Carousel fade data-bs-theme="dark" style={{ zIndex: "0" }}>
                <Carousel.Item>
                  <Card className="border-0 mb-5 ps-5">
                    <Card.Img
                      style={{ height: "20rem", width: "22rem" }}
                      src={image_logo}
                    />
                  </Card>
                  <Carousel.Caption className="text-white">
                    <h3>First Theme</h3>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Card className="border-0 mb-5 ps-5">
                    <Card.Img
                      style={{ height: "20rem", width: "22rem" }}
                      src={image_logo}
                    />
                  </Card>
                  <Carousel.Caption className="text-white">
                    <h3>Second Theme</h3>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <Card className="border-0 mb-5 ps-5">
                    <Card.Img
                      style={{ height: "20rem", width: "22rem" }}
                      src={image_logo}
                    />
                  </Card>
                  <Carousel.Caption className="text-white">
                    <h3>Third Theme</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Ourservices;
