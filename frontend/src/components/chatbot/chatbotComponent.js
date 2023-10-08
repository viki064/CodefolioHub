import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { BiBot, BiUser } from "react-icons/bi";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import "./chatBot.css";
import ChatAPIService from "../../APIServices/APIService";
import CryptoJS from "crypto-js";

function ChatBotComponent(props) {
  const [chat, setChat] = useState([
    {
      sender: "bot",
      msg: "Hello There! How can i assist you with the candidate's resume.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const email = props.email;
  const text = "johndoe@example.com";
  const secretPass = "XkhZG4fW2t2W";

  const encryptData = () => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      secretPass
    ).toString();

    console.log("Encrypted Data: " + data);
    decryptData();
  };

  const decryptData = () => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    console.log(CryptoJS.enc.Utf16.stringify(bytes));
    const data = bytes.toString(CryptoJS.enc.Utf8);
    console.log("Decrypted Data: " + data);
  };

  useEffect(() => {
    const objDiv = document.getElementById("messageArea");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chat]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const request_temp = { sender: "user", msg: inputMessage };

    if (inputMessage !== "") {
      setChat((chat) => [...chat, request_temp]);
      setBotTyping(true);
      rasaAPI(inputMessage);
      setInputMessage("");
    } else {
      encryptData();
      // window.alert("Please enter a valid message");
    }
  };

  const rasaAPI = async function handleClick(msg) {
    ChatAPIService.ChatMsg(email, { user: msg }).then((response) => {
      if (response) {
        const recipient_msg = response.Assistant;

        const response_temp = {
          sender: "bot",
          msg: recipient_msg,
        };
        setBotTyping(false);
        setChat((chat) => [...chat, response_temp]);
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card className="chat-card" style={{ width: "50vh" }}>
            <Card.Header className="chat-header">
              <h3 className="mb-0">Chat with ResumeBot</h3>
              {botTyping && <h6>Bot Typing....</h6>}
            </Card.Header>
            <Card.Body id="messageArea" className="chat-body">
              <div className="row msg-area">
                {chat.map((user, key) => (
                  <div
                    key={key}
                    className={
                      user.sender === "bot"
                        ? "msg-align-start"
                        : "msg-align-end"
                    }
                  >
                    {user.sender === "bot" ? (
                      <>
                        <BiBot className="bot-icon" />
                        <p className="bot-msg">{user.msg}</p>
                      </>
                    ) : (
                      <>
                        <p className="user-msg">{user.msg}</p>
                        <BiUser className="user-icon" />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </Card.Body>
            <Card.Footer className="chat-footer">
              <Form onSubmit={handleSubmit} className="d-flex">
                <Form.Control
                  type="text"
                  className="msg-input"
                  onChange={(e) => setInputMessage(e.target.value)}
                  value={inputMessage}
                  placeholder="Type your question about this resume here...."
                />
                <Button type="submit" className="circle-btn">
                  <IoMdSend className="send-btn" />
                </Button>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatBotComponent;
