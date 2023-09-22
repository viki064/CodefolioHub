import { Switch } from "@mui/material";
import React, { useState } from "react";
import { Button, Card, CardGroup, Container } from "react-bootstrap";

function Themes(props) {
  const dark = props.dark;
  const [is_ChatBot, setIs_ChatBot] = useState(false);
  const handleChatBot = () => {
    setIs_ChatBot(!is_ChatBot);
  };

  return (
    <Container>
      <CardGroup className="mt-5" style={{ width: "30vh" }}>
        <Card border={`primary ${dark ? "bg-dark text-white" : ""}`}>
          {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
          <Card.Body>
            <Card.Title>Basic Dark Format Theme</Card.Title>
            <Card.Text>
              Displays your resume in a portable website format where you can
              share publicly and share with your employers.
            </Card.Text>
            <hr />
            <Card.Text>
              ChatBot is required?
              <Switch
                checked={is_ChatBot}
                onChange={handleChatBot}
                name="dark"
                className="ms-4"
              />
            </Card.Text>
            <hr />
          </Card.Body>
          <Card.Footer className="text-end">
            <Button>Publish</Button>
          </Card.Footer>
        </Card>
      </CardGroup>
    </Container>
  );
}

export default Themes;
