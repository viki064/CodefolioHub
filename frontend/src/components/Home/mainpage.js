import React, { useState } from "react";
import image_logo from "../../staticComponents/logo.png";
import { Col, Container, Row, Card, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPalette,
  faLink,
  faMobileAlt,
  faRocket,
  faCheck,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import Ourservices from "./ourservices";
import Aboutus from "./about";
import LoginSignup from "./logsign";
import "./mainpage.css";

function Mainpage() {
  const [modalShow, setModalShow] = useState(false);

  const features = [
    {
      icon: faPalette,
      title: "5 Professional Themes",
      description: "Choose from Classic, Modern, Developer, Creative, and Executive themes"
    },
    {
      icon: faLink,
      title: "Custom URLs",
      description: "Create memorable portfolio URLs with custom slugs"
    },
    {
      icon: faMobileAlt,
      title: "Fully Responsive",
      description: "Perfect on mobile, tablet, and desktop devices"
    }
  ];

  return (
    <>
      <div id="home">
        {/* Hero Section */}
        <section className="hero-section">
          <Container>
            <Row className="align-items-center min-vh-100 py-5">
              <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
                <Badge bg="info" className="mb-3 px-3 py-2">
                  <FontAwesomeIcon icon={faRocket} /> New: AI-Powered Chatbot
                </Badge>
                <h1 className="display-3 fw-bold mb-4 hero-title">
                  Create Your Portfolio Like a <span className="text-gradient">PRO</span>
                </h1>
                <p className="lead text-muted mb-4">
                  Build a stunning professional portfolio in minutes with CodefolioHub.
                  Choose from multiple themes, customize your content, and share your
                  unique URL with the world.
                </p>
                <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start">
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-4 py-3 btn-gradient"
                    onClick={() => setModalShow(true)}
                  >
                    Get Started Free <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    className="px-4 py-3"
                    href="#ourservice"
                  >
                    Learn More
                  </Button>
                </div>

                {/* Features List */}
                <div className="mt-5">
                  <Row className="g-3">
                    <Col xs={12} className="mb-2">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                        <small className="text-muted">No credit card required</small>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                        <small className="text-muted">Setup in under 5 minutes</small>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={6}>
                <div className="hero-image-wrapper">
                  <div className="floating-card">
                    <Card className="shadow-lg border-0 overflow-hidden">
                      <Card.Img
                        className="hero-logo"
                        variant="top"
                        src={image_logo}
                        alt="CodefolioHub Portfolio Preview"
                      />
                    </Card>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Features Highlight Section */}
        <section className="features-highlight py-5 bg-light">
          <Container>
            <Row className="g-4">
              {features.map((feature, index) => (
                <Col md={4} key={index}>
                  <Card className="h-100 border-0 shadow-sm feature-card">
                    <Card.Body className="text-center p-4">
                      <div className="feature-icon mb-3">
                        <FontAwesomeIcon icon={feature.icon} size="2x" className="text-primary" />
                      </div>
                      <Card.Title className="h5 mb-3">{feature.title}</Card.Title>
                      <Card.Text className="text-muted">
                        {feature.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <Ourservices />
        <Aboutus />
      </div>

      <LoginSignup show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default Mainpage;
