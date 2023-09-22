import React from "react";
import { Card, Container, Image, Row, Col } from "react-bootstrap";

function UserProfile(props) {
  const user = { ...props.profile };
  return (
    // {`${dark ? "darkmode" : "lightmode"} ms-2 d-none d-sm-inline fs-4`}
    <div>
      <Card className={`user-profile ${props.dark? "bg-dark text-light": ""} border mt-4 ms-3`}>
        <Card.Header>
          <Container fluid>
            <Row>
              <Col xs="auto">
                <h4>{user.name}</h4>
                <strong>Email:</strong> {user.email}
              </Col>
              <Col className="text-end">
                <Image
                  src={user.picture}
                  alt={`${user.given_name}'s Profile`}
                  roundedCircle
                  width={100}
                  height={100}
                />
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body className="border-top">
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email}
          </Card.Text>
          <Card.Text>
            <strong>Published URL:</strong> {user.picture}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserProfile;
