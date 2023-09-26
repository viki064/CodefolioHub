import React from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import { FRONTEND_URL } from "../../staticComponents/constant";

function Home() {
  return (
    <>
      <Container className="m-5 p-5 border shadow-md rounded">
        <h4>Create a Unique identifier:</h4>
        <br />
        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2" className="h2">
              {FRONTEND_URL}
            </Form.Label>
            <Col sm="4">
              <Form.Control type="text" placeholder="your-unique-identifier" />
            </Col>
            <Col sm="4">
              <Button variant="secondary" type="submit">
                Publish The URL
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default Home;
