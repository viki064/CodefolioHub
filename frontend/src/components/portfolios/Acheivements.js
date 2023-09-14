import React from "react";
import { Container, Row } from "react-bootstrap";
// import FlipCard from "./flipcard";

function Acheivements(props) {
  const certifications =
    props.achieve && props.achieve.Certifications
      ? props.achieve.Certifications.split(". ")
      : [];
  const acheivements =
    props.achieve && props.achieve.Achievements
      ? props.achieve.Achievements.split(". ")
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
          Certifications & Acheivements
        </h4>
      </Row>
      <>
        <h4 className="text-decoration-underline">Certifications: </h4>
        {certifications.map((item) => {
          return <p>{item}</p>;
        })}
        <h4 className="text-decoration-underline">Acheivements: </h4>
        {acheivements.map((item) => {
          return <p>{item}</p>;
        })}
      </>
    </Container>
  );
}

export default Acheivements;
