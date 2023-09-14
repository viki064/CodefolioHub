import React from "react";
import { GoogleLogin } from "react-google-login";

function GoogleLoginComponent() {
  const responseGoogle = (response) => {
    // Handle Google login response here
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default GoogleLoginComponent;
