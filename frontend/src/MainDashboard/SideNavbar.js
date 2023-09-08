import React, { useState, useEffect } from "react";
import "bootstrap/js/dist/dropdown";
import "./SideMenu.css";
import logo from "../staticComponents/logo.png";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./home";
import EditResume from "./editResume";
import Themes from "./themes";
// import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import ChatAPIService from "../APIServices/APIService";

const SideNavbar = () => {
  // console.log(process.env.REACT_APP_DARK_MODE);
  // const [dark, setDark] = useState(process.env.REACT_APP_DARK_MODE);
  // const handleChange = () => {
  //   setDark(!dark);
  // };
  const [resume, setResume] = useState("");
  const email = "modiyam.vikram@gmail.com";

  useEffect(() => {
    ChatAPIService.loadResume(email)
      .then((resp) => {
        setResume(resp);
        // console.log(resp);
      })
      .catch((error) => console.log(error));
  }, [email]);
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <div className="position-fixed col-auto col-md-2 min-vh-100 d-flex justify-content-between flex-column">
            <div className="pt-3">
              <Link
                to="/"
                className="text-decoration-none d-none d-sm-inline d-flex align-itemcenter ms-3 mt-3"
              >
                <img
                  style={{ height: "8vh", width: "8vh" }}
                  src={logo}
                  alt="logo"
                ></img>
                <span className="ms-2 fs-4">CodefolioHub</span>
              </Link>
              <hr className="text-secondary d-none d-sm-block" />
              <ul className="nav nav-tabs flex-column mt-3 mt-sm-0">
                <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                  <Link to="/" className="nav-link fs-5">
                    <i className="fs-4 bi bi-house"></i>
                    <span className="ms-2 d-none d-sm-inline">Home</span>
                  </Link>
                </li>
                <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                  <Link to="/edit-resume" className="nav-link fs-5">
                    <i className="fs-4 bi bi-speedometer2"></i>
                    <span className="ms-2 d-none d-sm-inline">Edit Resume</span>
                  </Link>
                </li>
                <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                  <Link to="/themes" className="nav-link fs-5">
                    <i className="fs-4 bi bi-table"></i>
                    <span className="ms-2 d-none d-sm-inline">Themes</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="dropdown open">
              {/* <div className="ms-3 d-none d-sm-inline">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={dark}
                        onChange={handleChange}
                        name="dark"
                        color="default"
                      />
                    }
                    label={dark ? "Dark Mode" : "Light Mode"}
                  />
                </FormGroup>
              </div> */}
              <Link
                className="text-decoration-none dropdown-toggle p-3"
                type="button"
                id="triggerId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>{" "}
                <span className="ms-2 d-none d-sm-inline">Vikram</span>
              </Link>
              <div className="dropdown-menu" aria-labelledby="triggerId">
                <Link className="dropdown-item">
                  {/* <span className="d-sm-inline">1</span>
                <span className="d-none d-sm-block">Profile</span> */}
                  Profile
                </Link>
                <Link className="dropdown-item">Settings</Link>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
          <div className="col">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                path="/edit-resume"
                element={<EditResume resume={resume} />}
              />
              <Route path="/themes" element={<Themes />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default SideNavbar;
