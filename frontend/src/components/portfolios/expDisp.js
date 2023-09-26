import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ExpDisp(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        variant=""
        className="text-decoration-none"
        onClick={() => setShow(true)}
      >
        {props.work.CompanyName}
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <h1>{props.work.CompanyName}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {"Position: " + props.work.Position}
            <br />
            {props.work.StartDate + " - " + props.work.EndDate}
          </p>

          <p className="h5">Responsibilities: </p>
          <p>{props.work.Responsibilities}</p>
          <p className="h5">Skills: </p>
          <p>{props.work.Technologies}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ExpDisp;
