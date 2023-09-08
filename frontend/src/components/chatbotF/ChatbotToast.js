import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";

function ChatbotToast() {
  const [show, setShow] = useState(true);

  return (
    <div
      className="position-fixed bottom-0 end-0 mb-5"
      style={{ marginRight: "14vh" }}
    >
      <Toast
        onClose={() => setShow(false)}
        show={show}
        style={{ zIndex: "10", backgroundColor: "black" }}
        delay={3000}
        autohide
      >
        {/* <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header> */}
        <Toast.Body>
          This chatbot is build using <strong>Chat-GPT</strong>, to provide more
          acurate results of the candidate.
        </Toast.Body>
      </Toast>
    </div>
  );
}

export default ChatbotToast;
