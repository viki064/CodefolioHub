import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGoogle } from "@fortawesome/free-brands-svg-icons";
// import GoogleLogin from "../Login/GoogleLogin";
// import APIService from "../../APIService";

function LoginSignup(props) {
  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "155px" }}>
            Login/SignUp
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto">
          <div className="d-grid gap-2">
            <Button variant="transparant" size="lg">
              <FontAwesomeIcon icon={faGoogle} />
              {"  "}
              Login with Google
            </Button>
            <Button variant="secondary" size="lg">
              <FontAwesomeIcon icon={faLinkedinIn} />
              {"  "}
              Login with LinkedIn
            </Button>
          </div>
        </Modal.Body>
        {/* <Modal.Footer className="mx-auto">
          <Button variant="outline-secondary">Login with Email</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default LoginSignup;
