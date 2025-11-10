import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { LINKEDIN_LOGIN_URL, BACKEND_URL } from "../../staticComponents/constant";
// import GoogleLogin from "../Login/GoogleLogin";
// import APIService from "../../APIService";

function LoginSignup(props) {
  const handleLinkedInLogin = () => {
    window.location.href = LINKEDIN_LOGIN_URL;
  };

  const handleDevLogin = () => {
    window.location.href = BACKEND_URL + "dev-login";
  };

  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            Login/SignUp
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-4">
          <div className="d-grid gap-3">
            {/* <Button variant="transparant" size="lg">
              <FontAwesomeIcon icon={faGoogle} />
              {"  "}
              Login with Google
            </Button> */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleLinkedInLogin}
              className="py-3 shadow-sm"
            >
              <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              {"  "}
              Login with LinkedIn
            </Button>

            <div className="text-center my-2">
              <small className="text-muted">or</small>
            </div>

            <Button
              variant="outline-secondary"
              size="lg"
              onClick={handleDevLogin}
              className="py-3"
            >
              <FontAwesomeIcon icon={faCode} />
              {"  "}
              Development Login
            </Button>

            <div className="alert alert-info mt-2 mb-0" role="alert">
              <small>
                <strong>Development Login:</strong> Use this option for testing without LinkedIn OAuth configuration.
              </small>
            </div>
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
