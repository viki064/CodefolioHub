import React, { useState, useEffect } from "react";
import "bootstrap/js/dist/dropdown";
import "./SideMenu.css";
import logo from "../../staticComponents/logo.png";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./home";
import EditResume from "./editResume";
import Themes from "./themes";
import APIService from "../../APIServices/APIService";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

const SideNavbar = () => {
  const [resume, setResume] = useState("");
  const [dark, setDark] = useState(true);
  const email = "modiyam.vikram@gmail.com";

  const handleChange = () => {
    setDark(!dark);
  };

  useEffect(() => {
    APIService.loadResume(email)
      .then((resp) => {
        setResume(resp);
        // console.log(resp);
      })
      .catch((error) => console.log(error));
  }, [email]);

  return (
    <>
      <div
        className={
          dark ? "text-white container-fluid" : "text-black container-fluid"
        }
        style={
          dark ? { backgroundColor: "#212529" } : { backgroundColor: "white" }
        }
      >
        <div className="row">
          <div
            className="position-fixed col-auto col-md-2 min-vh-100 d-flex justify-content-between flex-column border-end"
            style={{ minHeight: "100vh" }}
          >
            <div className="pt-3">
              <Link
                to="navbar/"
                className="text-decoration-none d-none d-sm-inline d-flex align-itemcenter ms-3 mt-3"
              >
                <img
                  style={{ height: "8vh", width: "8vh" }}
                  src={logo}
                  alt="logo"
                ></img>
                <span
                  className={`${dark ? "darkmode" : "lightmode"} ms-2 fs-4`}
                >
                  CodefolioHub
                </span>
              </Link>
              <hr className="text-secondary d-none d-sm-block" />
              <ul className="nav nav-tabs flex-column mt-3 mt-sm-0">
                <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                  <Link
                    to="navbar/"
                    className="nav-link fs-5"
                    style={dark ? { color: "white" } : { color: "black" }}
                  >
                    <i className="fs-4 bi bi-house"></i>
                    <span className="ms-2 d-none d-sm-inline">Home</span>
                  </Link>
                </li>
                <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                  <Link
                    to="navbar/edit-resume"
                    className="nav-link fs-5"
                    style={dark ? { color: "white" } : { color: "black" }}
                  >
                    <i className="fs-4 bi bi-speedometer2"></i>
                    <span className="ms-2 d-none d-sm-inline">Edit Resume</span>
                  </Link>
                </li>
                <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                  <Link
                    to="navbar/themes"
                    className="nav-link fs-5"
                    style={dark ? { color: "white" } : { color: "black" }}
                  >
                    <i className="fs-4 bi bi-table"></i>
                    <span className="ms-2 d-none d-sm-inline">Themes</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="dropdown open">
              <div
                className="ms-3 d-none d-sm-inline"
                style={dark ? { color: "white" } : { color: "black" }}
              >
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
              </div>
              <Link
                className="text-decoration-none dropdown-toggle p-3"
                type="button"
                id="triggerId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={dark ? { color: "white" } : { color: "black" }}
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
          <div className="col" style={{ minHeight: "100vh" }}>
            <Routes>
              <Route exact path="navbar/" element={<Home />} />
              <Route
                path="navbar/edit-resume"
                element={<EditResume resume={resume} dark={dark} />}
              />
              <Route path="navbar/themes" element={<Themes />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;
