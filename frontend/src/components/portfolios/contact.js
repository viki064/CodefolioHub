import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { FaPaperPlane } from "react-icons/fa";
import { BACKEND_URL } from "../../staticComponents/constant";

function Contact(props) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setShow(false);
    setAlert({ show: false, type: "", message: "" });
    setFormData({ name: "", email: "", message: "" });
    setValidated(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    setAlert({ show: false, type: "", message: "" });

    try {
      const response = await fetch(`${BACKEND_URL}contact/${props.portfolioOwnerEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setAlert({
          show: true,
          type: "success",
          message: "Message sent successfully! The portfolio owner will get back to you soon.",
        });
        // Reset form after successful submission
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setAlert({
          show: true,
          type: "danger",
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        show: true,
        type: "danger",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        style={{
          zIndex: "9",
          marginRight: "clamp(0.5rem, 3vw, 6vh)",
          marginLeft: "clamp(0.5rem, 3vw, 6vh)",
          borderRadius: "20px",
          minHeight: "44px",
          padding: "0.5rem 1.5rem",
        }}
        variant="primary"
        onClick={() => setShow(true)}
      >
        Hire Me{"  "}
        <FaPaperPlane />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Contact Me
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert.show && (
            <Alert variant={alert.type} dismissible onClose={() => setAlert({ show: false, type: "", message: "" })}>
              {alert.message}
            </Alert>
          )}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatinguser" label="Full Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                Please provide your name.
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              className="mb-3"
              controlId="floatingTextarea2"
              label="Your Message"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a message here"
                style={{ height: "100px" }}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a message.
              </Form.Control.Feedback>
            </FloatingLabel>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Sending...
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Contact;
