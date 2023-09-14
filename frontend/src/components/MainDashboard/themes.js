import { Switch } from "@mui/material";
import React, { useState } from "react";
import { Card, CardGroup, Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function Themes() {
  const [is_ChatBot, setIs_ChatBot] = useState(false);
  const handleChatBot = () => {
    setIs_ChatBot(!is_ChatBot);
  };

  return (
    <Container>
      <CardGroup className="mt-5" style={{ width: "30vh" }}>
        <Card border="primary">
          {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
          <Card.Body>
            <Card.Title>Basic Dark Format Theme</Card.Title>
            <Card.Text>
              Displays your resume in a portable website format where you can
              share publicly and share with your employers.
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              ChatBot is required?
              <Switch
                checked={is_ChatBot}
                onChange={handleChatBot}
                name="dark"
                className="ms-4"
              />
            </ListGroup.Item>
          </ListGroup>
          <Card.Footer style={{ alignItems: "end" }}>
            {/* <small className="text-muted">Last updated 3 mins ago</small> */}
            <Link
              variant="secondary"
              size="sm"
              style={{ marginLeft: "20vh" }}
              to={"http://localhost:3000/"}
            >
              Preview
            </Link>
          </Card.Footer>
        </Card>
      </CardGroup>
    </Container>
  );
}

export default Themes;
