import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FaPaperPlane } from "react-icons/fa";

function Contact() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        style={{
          zIndex: "9",
          marginRight: "6vh",
          marginLeft: "6vh",
          borderRadius: "20px",
        }}
        variant="primary"
        onClick={() => setShow(true)}
      >
        Hire Me{"  "}
        <FaPaperPlane />
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Contact Me
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form.Label htmlFor="inputPassword5">Full Name</Form.Label> */}
          <FloatingLabel controlId="floatinguser" label="Full Name">
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Full Name"
            />
          </FloatingLabel>
          {/* <Form.Label htmlFor="inputPassword5">Email</Form.Label> */}
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="floatingTextarea2"
            label="Comments"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <Button variant="primary" type="submit">
            Connect
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Contact;
