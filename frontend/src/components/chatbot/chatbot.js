import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { BiCommentDots } from "react-icons/bi";
import ChatbotToast from "./ChatbotToast";
import ChatBotComponent from "./chatbotComponent";

function Chatbot(props) {
  const [showChat, setShowChat] = useState(false);
  const email = props.email;

  const handleChatShow = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="position-fixed bottom-0 end-0 mb-5 me-5">
      <ChatbotToast />
      <Button
        variant="primary"
        style={{
          height: "60px",
          width: "60px",
          borderRadius: "50%",
          zIndex: "9",
        }}
        onClick={handleChatShow}
      >
        <BiCommentDots size={25} />
      </Button>

      {showChat ? (
        <div
          style={{
            position: "fixed",
            bottom: "3rem",
            right: "7rem",
            zIndex: "9",
          }}
        >
          {/* Render the ChatBot component with dynamic steps */}
          <ChatBotComponent email={email} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Chatbot;
