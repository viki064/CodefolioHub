import "./App.css";
import { React } from "react";
import Home from "./components/Home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Page from "./portfolios/page";
import SideNavbar from "./components/MainDashboard/SideNavbar";

function App() {
  // return <Home />;
  // data-bs-theme="dark"
  // {...(isDisabled ? { disabled: true } : {})}
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route>
            <Route path="/" exact element={<Home />} />
            <Route path="/dashboard/*" element={<SideNavbar />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
        {/* <Page /> */}
        {/* <SideNavbar /> */}
        {/* <Home /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
