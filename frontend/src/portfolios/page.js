import React, { useEffect, useState } from "react";
import Navbarf from "./navbar";
import Mainpage from "./mainpage";
import Footer from "./footer";
import Chatbot from "../components/chatbotF/chatbot";
import ChatAPIService from "../APIServices/APIService";
// import CryptoJS from "crypto-js";

function Page() {
  // const encryptionKey = "CodefolioHub";
  const [resume, setResume] = useState("");
  const email = "modiyam.vikram@gmail.com";
  // const hashedEmail = CryptoJS.AES.encrypt(email, encryptionKey).toString();
  // console.log(hashedEmail);

  useEffect(() => {
    ChatAPIService.loadResume(email)
      .then((resp) => {
        setResume(resp);
        // console.log(resp);
      })
      .catch((error) => console.log(error));
  }, [email]);

  return (
    <div>
      <Navbarf />
      <Mainpage email={email} resume={resume} />
      <Footer />
      <Chatbot email={email} />
    </div>
  );
}

export default Page;
