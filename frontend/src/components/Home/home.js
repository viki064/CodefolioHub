import { React } from "react";
import Navbarf from "./navbar";
import Mainpage from "./mainpage";
import Footer from "./footer";

function Home() {
  return (
    <>
      <div id="home">
        <Navbarf />
        <Mainpage />
        <Footer />
      </div>
    </>
  );
}

export default Home;
