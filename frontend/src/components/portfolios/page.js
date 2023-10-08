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

  useEffect(() => {
    APIService.loadResume(key)
      .then((resp) => {
        setResume(resp);
        // console.log(resp);
      })
      .catch((error) => console.log(error));
  }, [key]);

  return (
    <div>
      <Navbarf />
      <Mainpage email={key} resume={resume} />
      <Footer />
      <Chatbot email={key} />
    </div>
  );
}

export default Page;
