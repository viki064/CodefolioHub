import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbarf from "./navbar";
import Mainpage from "./mainpage";
import Footer from "./footer";
import Chatbot from "../chatbot/chatbot";
import APIService from "../../APIServices/APIService";

function Page() {
  const { key } = useParams();
  const [resume, setResume] = useState("");
  const [showChatbot, setShowChatbot] = useState(true);

  useEffect(() => {
    APIService.loadResume(key)
      .then((resp) => {
        setResume(resp);
        // Check if chatbot is enabled (default to true if not set)
        setShowChatbot(resp.enableChatbot !== undefined ? resp.enableChatbot : true);
        // console.log(resp);
      })
      .catch((error) => console.log(error));
  }, [key]);

  return (
    <div>
      <Navbarf portfolioOwnerEmail={key} />
      <Mainpage email={key} resume={resume} />
      <Footer />
      {showChatbot && <Chatbot email={key} />}
    </div>
  );
}

export default Page;
