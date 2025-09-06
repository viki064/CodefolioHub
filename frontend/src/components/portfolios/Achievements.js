import React from "react";
import { Container, Row } from "react-bootstrap";
// import FlipCard from "./flipcard";

function Achievements(props) {
  const certifications =
    props.achieve && props.achieve.Certifications
      ? props.achieve.Certifications
      : [];
  const achievements =
    props.achieve && props.achieve.Achievements
      ? props.achieve.Achievements
      : [];

  // console.log(certifications);
  return (
    <Container className="mt-5 p-4 shadow-lg rounded">
      <Row
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        <h4 className="text-decoration-underline">
          Certifications & Achievements
        </h4>
      </Row>
      <>
        <h4 className="text-decoration-underline">Certifications: </h4>
        {certifications.map((item) => {
          return <p>{item}</p>;
        })}
        <h4 className="text-decoration-underline">Achievements: </h4>
        {achievements.map((item) => {
          return <p>{item}</p>;
        })}
      </>
    </Container>
  );
}

export default Achievements;
