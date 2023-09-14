// src/components/LinkedInLogin.js

import React from "react";
import axios from "axios";

const LinkedInLogin = () => {
  const handleLinkedInLogin = () => {
    // Replace with your backend API endpoint for LinkedIn login
    axios
      .get("/auth/linkedin")
      .then((response) => {
        // Redirect user to the LinkedIn login page
        window.location.href = response.data.redirectUrl;
      })
      .catch((error) => {
        console.error("LinkedIn login error:", error);
      });
  };

  return (
    <div>
      <button onClick={handleLinkedInLogin}>Login with LinkedIn</button>
    </div>
  );
};

export default LinkedInLogin;
