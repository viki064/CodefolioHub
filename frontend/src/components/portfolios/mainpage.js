import React, { useEffect, useState } from "react";
import image_logo from "../../staticComponents/software-engineer.png";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import Skills from "./skills";
import Aos from "aos";
import Projects from "./projects";
import Acheivements from "./Acheivements";
import ChatAPIService from "../../APIServices/APIService";

function Mainpage(props) {
  const [showsumm, setShowsumm] = useState(false);
  const [summary, setSummary] = useState(" ");
  const [isLoading, setIsLoading] = useState(false);
  // console.log(props.email);

  const getSummary = () => {
    ChatAPIService.ChatMsg(props.email, {
      user: "Provide the short description with 40 words from the available candidate's resume",
    })
      .then((resp) => {
        setSummary(resp.Assistant);
      })
      .catch((error) => console.log(error));
    setIsLoading(!isLoading);
  };

  useEffect(() => {
    if (summary === " ") {
      setSummary("Loading....");
    } else {
      setSummary(summary);
    }
  }, [isLoading, summary, showsumm]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  });

  return (
    <>
      <div id="home" data-aos="zoom-in">
        <Container className="mt-5 p-4 shadow-lg rounded">
          <Row xs={1} md={2} className="g-4 mt-3">
            <Col>
              <Card className="mt-5 p-3 border-0">
                <Card.Body>
                  <Card.Title>
                    <p className="h4">
                      Hi There! This is{" "}
                      {props.resume.FirstName +
                        " " +
                        props.resume.MiddleName +
                        " " +
                        props.resume.LastName}
                    </p>
                  </Card.Title>
                  <Card.Text>
                    {props.resume.About}
                    <br />
                    <hr />
                    <Button
                      onClick={() => {
                        setShowsumm(!showsumm);
                        setIsLoading(!isLoading);
                        getSummary();
                      }}
                    >
                      Show Summary
                    </Button>
                    <br />
                    <br />
                    {showsumm ? summary : ""}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="ms-5 mb-3 ps-4 border-0">
                <Card.Img
                  style={{
                    height: "20rem",
                    width: "22rem",
                  }}
                  src={image_logo}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <div id="skills" data-aos="fade">
        <Skills skills={props.resume.TechnicalSkills} />
      </div>
      <div id="projects" data-aos="fade">
        <Projects work={props.resume} />
      </div>
      <div id="acheivements" data-aos="fade">
        <Acheivements achieve={props.resume} />
      </div>
    </>
  );
}

export default Mainpage;
