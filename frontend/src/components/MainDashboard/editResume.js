import { React, useState } from "react";
import {
  Container,
  Row,
  Form,
  Col,
  Button,
  Modal,
  ModalFooter,
} from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
// import FormExample from "../A_FormExample";

function formatDateString(inputDateString) {
  if (inputDateString === "Present") {
    // Get the current date
    const currentDate = new Date();

    // Format the current date to "YYYY-MM"
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  } else {
    // If the input string is not "present," perform the original date formatting logic
    const dateParts = inputDateString.split(" ");
    const month = dateParts[0]; // Month name
    const year = dateParts[1]; // Year
    const dateObject = new Date(`${month} 1, ${year}`);
    const formattedDate = `${dateObject.getFullYear()}-${(
      dateObject.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  }
}

function formatDateForInput(inputDateString) {
  const dateParts = inputDateString.split("-");
  const year = dateParts[0]; // Year
  const month = parseInt(dateParts[1], 10); // Month as a number

  // Get the month name based on the month number
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formattedMonth = monthNames[month - 1]; // Subtract 1 to get the correct index

  return `${formattedMonth} ${year}`;
}

function EditResume(props) {
  const [resume, setResume] = useState(props.resume ? { ...props.resume } : {});
  const [show, setShow] = useState(false);

  const [updatedValues, setUpdatedValues] = useState(
    resume ? { ...resume } : {}
  );

  const [inputSummary, setInputSummary] = useState("");
  const [summary, setSummary] = useState([
    ...updatedValues.ProfessionalSummary,
  ]);

  const summarySubmit = (e) => {
    e.preventDefault();
    if (inputSummary.trim() !== "") {
      // Add the new sentence to the list of sentences
      setSummary([...summary, inputSummary]);
      // Clear the input field
      setInputSummary("");
    }
  };

  const [inputSkills, setInputSkills] = useState("");
  const [skills, setSkills] = useState([...updatedValues.TechnicalSkills]);
  // console.log(skills);

  const skillsSubmit = (e) => {
    e.preventDefault();
    if (inputSkills.trim() !== "") {
      // Add the new sentence to the list of sentences
      setSkills([...skills, inputSkills]);
      // Clear the input field
      setInputSkills("");
    }
  };

  const [inputCerts, setInputCerts] = useState("");
  const [certs, setCerts] = useState([...updatedValues.Certifications]);

  const CertsSubmit = (e) => {
    e.preventDefault();
    if (inputCerts.trim() !== "") {
      // Add the new sentence to the list of sentences
      setCerts([...certs, inputCerts]);
      // Clear the input field
      setInputCerts("");
    }
  };

  const [inputAchivement, setInputAchivement] = useState("");
  const [achivement, setAchivement] = useState([...updatedValues.Achievements]);

  const AchivementSubmit = (e) => {
    e.preventDefault();
    if (inputCerts.trim() !== "") {
      // Add the new sentence to the list of sentences
      setAchivement([...achivement, inputAchivement]);
      // Clear the input field
      setInputAchivement("");
    }
  };

  const [workTemplate, setWorkTemplate] = useState({
    CompanyName: "",
    Position: "",
    ProjectName: "",
    StartDate: "",
    EndDate: "",
    Responsibilities: "",
    Technologies: "",
  });

  const [workItemIndex, setWorkItemIndex] = useState(0);
  const [work, setWork] = useState([...updatedValues.WorkExperience]);

  const updateWork = () => {
    const updatedWork = [...work];
    if (workItemIndex >= 0 && workItemIndex < updatedWork.length) {
      updatedWork[workItemIndex] = workTemplate;
      setWork(updatedWork);
      setShow(false);
    }
  };

  const workDispExp = (item) => {
    return (
      <Form.Group as={Col} className="mt-3">
        <Row>
          <Form.Label column sm="2">
            Company Name
          </Form.Label>
          <Form.Control
            type="text"
            value={item.CompanyName}
            readOnly
            style={{ maxWidth: "60vh" }}
          />
        </Row>
        <Row className="mt-3">
          <Form.Label column sm="2">
            Position
          </Form.Label>
          <Form.Control
            type="text"
            value={item.Position}
            readOnly
            style={{ maxWidth: "60vh" }}
          />
        </Row>
        <Row className="mt-3">
          <Form.Label column sm="2">
            Duration
          </Form.Label>
          <Form.Control
            type="text"
            value={item.StartDate + " - " + item.EndDate}
            readOnly
            style={{ maxWidth: "60vh" }}
          />
        </Row>
        <Row className="mt-3">
          <Col style={{ maxWidth: "22vh" }}>
            <Form.Label className="mt-4">Responsibilities</Form.Label>
          </Col>
          <Col>
            <Form.Control
              className="mt-3"
              as="textarea"
              value={item.Responsibilities}
              readOnly
              rows={5}
            />
            {/* <small>
              <strong>Note: </strong>Write all the responsibilities with
              seperater as '|'.
            </small> */}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col style={{ maxWidth: "22vh" }}>
            <Form.Label className="mt-4">Skills/Technologies</Form.Label>
          </Col>
          <Col>
            <Form.Control
              className="mt-3"
              as="textarea"
              value={item.Technologies}
              readOnly
              rows={2}
              placeholder="Write all the Skills with seperater as '|'."
            />
            {/* <small>
              <strong>Note: </strong>Write all the Skills with seperater as '|'.
            </small> */}
          </Col>
        </Row>
      </Form.Group>
    );
  };

  const updateFields = (newValues) => {
    // Create a copy of the constants dictionary
    const updatedConstants = { ...resume };

    // Update the specific fields with the new values
    Object.keys(newValues).forEach((fieldName) => {
      updatedConstants[fieldName] = newValues[fieldName];
    });

    // Set the state with the updated dictionary
    setResume(updatedConstants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedResume = {
      ...updatedValues,
      ProfessionalSummary: summary,
      TechnicalSkills: skills,
      Certifications: certs,
      Achievements: achivement,
      WorkExperience: work,
    };

    updateFields(updatedResume);
    // console.log(updatedResume);
    // console.log(resume);
  };

  return (
    <>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
        className="mt-3 text-decoration-underline"
      >
        YOUR RESUME
      </h2>
      <Container className="mt-4 mb-5 p-4 border shadow-md rounded">
        <Row
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <h4 className="text-decoration-underline">Personal Information</h4>
        </Row>

        <Row>
          {/* <FormExample /> */}
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mt-4">
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedValues.FirstName}
                  onChange={(e) =>
                    setUpdatedValues({
                      ...updatedValues,
                      FirstName: e.target.value,
                    })
                  }
                  placeholder="First Name"
                  style={{ maxWidth: "60vh" }}
                />
              </Col>
              <Col>
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedValues.MiddleName}
                  onChange={(e) =>
                    setUpdatedValues({
                      ...updatedValues,
                      MiddleName: e.target.value,
                    })
                  }
                  placeholder="Middle Name"
                  style={{ maxWidth: "60vh" }}
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedValues.LastName}
                  onChange={(e) =>
                    setUpdatedValues({
                      ...updatedValues,
                      LastName: e.target.value,
                    })
                  }
                  placeholder="Last Name"
                  style={{ maxWidth: "60vh" }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-4">
              <Col>
                <Form.Label>Short Description</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedValues.About}
                  onChange={(e) =>
                    setUpdatedValues({
                      ...updatedValues,
                      About: e.target.value,
                    })
                  }
                  placeholder="Short Description"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-3">
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={updatedValues.Email}
                  onChange={(e) =>
                    setUpdatedValues({
                      ...updatedValues,
                      Email: e.target.value,
                    })
                  }
                  placeholder="name@example.com"
                  style={{ maxWidth: "60vh" }}
                />
              </Col>
              <Col>
                <Form.Label>Country Code</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedValues.CountryCode}
                  onChange={(e) =>
                    setUpdatedValues({
                      ...updatedValues,
                      CountryCode: e.target.value,
                    })
                  }
                  placeholder="Country Code"
                  style={{ maxWidth: "60vh" }}
                />
              </Col>
              <Col>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedValues.Contact}
                  onChange={(e) =>
                    setUpdatedValues({
                      ...updatedValues,
                      Contact: e.target.value,
                    })
                  }
                  placeholder="Contact Number"
                  style={{ maxWidth: "60vh" }}
                />
              </Col>
            </Form.Group>
            <Row>
              <h4 className="mt-4 text-decoration-underline">
                Professional Summary
              </h4>
              {summary.map((itemSummary, index) => {
                return (
                  <Row>
                    <Col>
                      <span key={index}>
                        {index + 1 + " - " + itemSummary}
                        <br />
                      </span>
                    </Col>
                    <Col style={{ maxWidth: "8vh" }}>
                      <button
                        type="button"
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() =>
                          setSummary([
                            ...summary.slice(0, index),
                            ...summary.slice(index + 1),
                          ])
                        }
                      >
                        <DeleteIcon
                          style={
                            props.dark ? { color: "white" } : { color: "black" }
                          }
                        />
                      </button>
                    </Col>
                  </Row>
                );
              })}
            </Row>
            <Form.Group as={Row} className="mt-2">
              <Col>
                <Form.Control
                  type="text"
                  value={inputSummary}
                  onChange={(e) => setInputSummary(e.target.value)}
                  placeholder="Click on Add button to add the summary."
                />
              </Col>
              <Col style={{ maxWidth: "10vh" }}>
                <Button type="submit" onClick={summarySubmit}>
                  Add
                </Button>
              </Col>
            </Form.Group>

            <Row>
              <h4
                className="mt-4 mb-4 text-decoration-underline"
                style={{ textAlign: "center" }}
              >
                Technical Skills
              </h4>
              <div
                style={{ display: "flex", flexWrap: "wrap", marginTop: "2vh" }}
              >
                {skills.map((itemSkill, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        marginLeft: "2px",
                        backgroundColor: "black",
                        color: "white",
                        textAlign: "center",
                        borderRadius: "5vh",
                        display: "inline-block",
                        margin: "5px",
                      }}
                    >
                      <p className="h6 m-1 ms-3">
                        {itemSkill}{" "}
                        <button
                          type="button"
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                          onClick={() =>
                            setSkills([
                              ...skills.slice(0, index),
                              ...skills.slice(index + 1),
                            ])
                          }
                        >
                          <DeleteIcon style={{ color: "white" }} />
                        </button>
                      </p>
                    </div>
                  );
                })}
              </div>
            </Row>
            <Form.Group as={Row} className="mt-4">
              <Col>
                <Form.Control
                  type="text"
                  value={inputSkills}
                  onChange={(e) => setInputSkills(e.target.value)}
                  placeholder="Click on Add button to add the skills."
                />
              </Col>
              <Col style={{ maxWidth: "10vh" }}>
                <Button type="submit" onClick={skillsSubmit}>
                  Add
                </Button>
              </Col>
            </Form.Group>
            <Row
              style={{
                textAlign: "center",
              }}
            >
              <h4 className="mt-4 text-decoration-underline">Education</h4>
            </Row>
            <Form.Group as={Row} className="mt-2">
              <Col>
                <Form.Label>Education</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedValues.Education}
                  onChange={(e) =>
                    setUpdatedValues({
                      ...updatedValues,
                      Education: e.target.value,
                    })
                  }
                  placeholder="[<B.E/B.Tech> - <Course Name> from <College Name> <Country> in <Passed Year>.]"
                />
              </Col>
            </Form.Group>
            <Row>
              <h4 className="mt-4 text-decoration-underline">Certifications</h4>
              {certs.map((itemCerts, index) => {
                return (
                  <Row>
                    <Col>
                      <span key={index}>
                        {index + 1 + " - " + itemCerts}
                        <br />
                      </span>
                    </Col>
                    <Col style={{ maxWidth: "8vh" }}>
                      <button
                        type="button"
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() =>
                          setCerts([
                            ...certs.slice(0, index),
                            ...certs.slice(index + 1),
                          ])
                        }
                      >
                        <DeleteIcon
                          style={
                            props.dark ? { color: "white" } : { color: "black" }
                          }
                        />
                      </button>
                    </Col>
                  </Row>
                );
              })}
            </Row>
            <Form.Group as={Row} className="mt-4">
              <Col>
                <Form.Control
                  type="text"
                  value={inputCerts}
                  onChange={(e) => setInputCerts(e.target.value)}
                  placeholder="Click on Add button to add the Certificates."
                />
              </Col>
              <Col style={{ maxWidth: "10vh" }}>
                <Button type="submit" onClick={CertsSubmit}>
                  Add
                </Button>
              </Col>
            </Form.Group>
            <Row>
              <h4 className="mt-4 text-decoration-underline">Achievements</h4>
              {achivement.map((itemAchivement, index) => {
                return (
                  <Row>
                    <Col>
                      <span key={index}>
                        {index + 1 + " - " + itemAchivement}
                        <br />
                      </span>
                    </Col>
                    <Col style={{ maxWidth: "8vh" }}>
                      <button
                        type="button"
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() =>
                          setAchivement([
                            ...achivement.slice(0, index),
                            ...achivement.slice(index + 1),
                          ])
                        }
                      >
                        <DeleteIcon
                          style={
                            props.dark ? { color: "white" } : { color: "black" }
                          }
                        />
                      </button>
                    </Col>
                  </Row>
                );
              })}
            </Row>
            <Form.Group as={Row} className="mt-4">
              <Col>
                <Form.Control
                  type="text"
                  value={inputAchivement}
                  onChange={(e) => setInputAchivement(e.target.value)}
                  placeholder="Click on Add button to add the Achivements."
                />
              </Col>
              <Col style={{ maxWidth: "10vh" }}>
                <Button type="submit" onClick={AchivementSubmit}>
                  Add
                </Button>
              </Col>
            </Form.Group>

            <Row>
              <h4 className="mt-4 text-decoration-underline">
                Work Experience
                <Button type="button" className="ms-4 me-2" onClick={() => {}}>
                  Add Experience <BorderColorIcon />
                </Button>
              </h4>
            </Row>
            <div>
              {work.map((workitem, index) => {
                return (
                  <div key={index} className="p-2 mb-2 border">
                    <h4 className="text-decoration-underline">
                      {"Experience: " + (index + 1)}
                    </h4>

                    {workDispExp(workitem)}
                    <div className="mb-3 ms-2">
                      <Button
                        type="button"
                        className="me-2"
                        onClick={() => {
                          setShow(true);
                          setWorkTemplate(workitem);
                          setWorkItemIndex(index);
                        }}
                      >
                        Edit <BorderColorIcon />
                      </Button>
                      <Button
                        type="button"
                        className="ms-2 bg-danger border border-danger"
                        onClick={() =>
                          setWork([
                            ...work.slice(0, index),
                            ...work.slice(index + 1),
                          ])
                        }
                      >
                        Delete <DeleteIcon />
                      </Button>
                    </div>
                  </div>
                );
              })}
              <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="example-custom-modal-styling-title"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-custom-modal-styling-title">
                    {/* <h1>{companyName}</h1> */}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group as={Col} className="mt-3">
                    <Row>
                      <Form.Label column sm="3">
                        Company Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Company Name"
                        value={workTemplate.CompanyName}
                        onChange={(e) => {
                          setWorkTemplate({
                            ...workTemplate,
                            CompanyName: e.target.value,
                          });
                        }}
                        style={{ maxWidth: "60vh" }}
                      />
                    </Row>
                    <Row className="mt-3">
                      <Form.Label column sm="3">
                        Position
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Position"
                        value={workTemplate.Position}
                        onChange={(e) => {
                          setWorkTemplate({
                            ...workTemplate,
                            Position: e.target.value,
                          });
                        }}
                        style={{ maxWidth: "60vh" }}
                      />
                    </Row>
                    <Row className="mt-3">
                      <Form.Label column sm="3">
                        Start Date
                      </Form.Label>
                      <Form.Control
                        type="month"
                        value={formatDateString(workTemplate.StartDate)}
                        onChange={(e) => {
                          setWorkTemplate({
                            ...workTemplate,
                            StartDate: formatDateForInput(e.target.value),
                          });
                        }}
                        style={{ maxWidth: "60vh" }}
                      />
                    </Row>
                    <Row className="mt-3">
                      <Form.Label column sm="3">
                        End Date
                      </Form.Label>
                      <Form.Control
                        type="month"
                        value={formatDateString(workTemplate.EndDate)}
                        onChange={(e) => {
                          setWorkTemplate({
                            ...workTemplate,
                            EndDate: formatDateForInput(e.target.value),
                          });
                        }}
                        style={{ maxWidth: "60vh" }}
                      />
                    </Row>
                    <Row className="mt-3">
                      <Col style={{ maxWidth: "20vh" }}>
                        <Form.Label column sm="3">
                          Responsibilities
                        </Form.Label>
                      </Col>
                      <Col>
                        <Form.Control
                          as="textarea"
                          value={workTemplate.Responsibilities}
                          onChange={(e) => {
                            setWorkTemplate({
                              ...workTemplate,
                              Responsibilities: e.target.value,
                            });
                          }}
                          placeholder="Write all the Responsibilities with seperater as '|'."
                          rows={5}
                        />
                        <small>
                          <strong>Note: </strong>Write all the responsibilities
                          with seperater as '|'.
                        </small>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col style={{ maxWidth: "20vh" }}>
                        <Form.Label className="mt-4">
                          Skills/Technologies
                        </Form.Label>
                      </Col>
                      <Col>
                        <Form.Control
                          className="mt-3"
                          as="textarea"
                          value={workTemplate.Technologies}
                          onChange={(e) => {
                            setWorkTemplate({
                              ...workTemplate,
                              Technologies: e.target.value,
                            });
                          }}
                          rows={2}
                          placeholder="Write all the Skills with seperater as '|'."
                        />
                        <small>
                          <strong>Note: </strong>Write all the Skills with
                          seperater as '|'.
                        </small>
                      </Col>
                    </Row>
                  </Form.Group>
                </Modal.Body>
                <ModalFooter>
                  <Button
                    type="button"
                    className="me-2"
                    onClick={() => {
                      updateWork();
                    }}
                  >
                    <BorderColorIcon /> Update
                  </Button>
                </ModalFooter>
              </Modal>
            </div>

            {/* Update resume Button */}
            <Form.Group className="m-4" as={Row}>
              <Col></Col>
              <Col></Col>
              <Col>
                <Button variant="secondary" type="submit">
                  Update Resume
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default EditResume;
