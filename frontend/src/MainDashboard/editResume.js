import { React, useState } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
// import FormExample from "../A_FormExample";

function EditResume(props) {
  const [resume, setResume] = useState(props.resume ? { ...props.resume } : {});

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
    // Call the updateFields function to update all fields
    const updatedResume = { ...updatedValues, ProfessionalSummary: summary };
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
                  <span key={index}>
                    {index + 1 + " - " + itemSummary}
                    <br />
                  </span>
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
                        backgroundColor: "grey",
                        textAlign: "center",
                        borderRadius: "5vh",
                        display: "inline-block",
                        margin: "5px",
                      }}
                    >
                      <p className="h6 m-2">{itemSkill}</p>
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
                  <span key={index}>
                    {index + 1 + " - " + itemCerts}
                    <br />
                  </span>
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
                  <span key={index}>
                    {index + 1 + " - " + itemAchivement}
                    <br />
                  </span>
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

            <Form.Group className="mt-3" as={Row}>

            </Form.Group>

            {/* Update resume Button */}
            <Form.Group className="mt-3" as={Row}>
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
