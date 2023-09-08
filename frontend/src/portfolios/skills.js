import React, { useEffect, useState } from "react";
import { Container, Row, Nav } from "react-bootstrap";

function Skills(props) {
  // console.log(props.skills);
  const skillKeys = Array.from(new Set(Object.keys(props.skills || {})));
  const skillValues = Object.values(props.skills || {})
    .join(", ")
    .split(", ");
  const [skills, setSkills] = useState([]);
  const [skillKey, setSkillkey] = useState("");
  // console.log(skills);

  useEffect(() => {
    if (props.skills && skillKey) {
      setSkills(props.skills[skillKey.key].split(", "));
    } else {
      setSkills([]);
    }
  }, [props.skills, skillKey]);

  return (
    <Container className="mt-5 p-4 shadow-lg rounded">
      <Row
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        <h4>Skills</h4>
      </Row>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          color: "black",
        }}
      >
        <Nav variant="underline">
          <Nav.Link
            className="text-white"
            active
            onClick={() => {
              setSkillkey("");
            }}
          >
            All
          </Nav.Link>
          {skillKeys.map((key) => {
            return (
              <Nav.Link
                className="text-white"
                onClick={() => {
                  setSkillkey({ key });
                }}
              >
                {key}
              </Nav.Link>
            );
          })}
        </Nav>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "5vh" }}>
        {skills.length === 0
          ? skillValues.map((skill) => (
              <div
                key={skill}
                style={{
                  marginLeft: "2px",
                  backgroundColor: "grey",
                  textAlign: "center",
                  borderRadius: "5vh",
                  display: "inline-block",
                  margin: "5px",
                }}
              >
                <p className="h6 m-2">{skill}</p>
              </div>
            ))
          : skills.map((skill) => (
              <div
                key={skill}
                style={{
                  marginLeft: "2px",
                  backgroundColor: "grey",
                  textAlign: "center",
                  borderRadius: "5vh",
                  display: "inline-block",
                  margin: "5px",
                }}
              >
                <p className="h6 m-2">{skill}</p>
              </div>
            ))}
      </div>
    </Container>
  );
}

export default Skills;
