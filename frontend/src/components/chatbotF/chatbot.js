import { React, useState, useEffect } from "react";
import ChatbotKit from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./chatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "./bot.css";
import { Button } from "react-bootstrap";
import { BiCommentDots } from "react-icons/bi";
import ChatbotToast from "./ChatbotToast";
import ChatAPIService from "../../APIServices/APIService";

function Chatbot(props) {
  const [showChat, setShowChat] = useState(false);

  const handleChatShow = () => {
    setShowChat(!showChat);
  };

  // const [resume, setResume] = useState("");

  useEffect(() => {
    ChatAPIService.loadResume(props.email)
      .then((resp) => {
        // setResume(resp);
        console.log(resp);
      })
      .catch((error) => console.log(error));
  }, [props.email]);

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
          <ChatbotKit
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Chatbot;
