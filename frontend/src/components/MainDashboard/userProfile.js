import React, { useState, useEffect } from "react";
import { Card, Container, Image, Row, Col, Button } from "react-bootstrap";
import { FRONTEND_URL } from "../../staticComponents/constant";
import APIService from "../../APIServices/APIService";

function UserProfile(props) {
  const user = { ...props.profile };
  const [portfolioUrl, setPortfolioUrl] = useState("");

  useEffect(() => {
    if (user.email) {
      // Load resume to check for custom slug
      APIService.loadResume(user.email)
        .then((resumeResp) => {
          if (resumeResp.customSlug) {
            setPortfolioUrl(`${FRONTEND_URL}${resumeResp.customSlug}`);
          } else {
            setPortfolioUrl(`${FRONTEND_URL}${user.email}`);
          }
        })
        .catch((error) => {
          console.log(error);
          // Fallback to email if error
          setPortfolioUrl(`${FRONTEND_URL}${user.email}`);
        });
    }
  }, [user.email]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioUrl);
    alert("Portfolio URL copied to clipboard!");
  };

  return (
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
            <strong>Published URL:</strong>{" "}
            {portfolioUrl ? (
              <>
                <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                  {portfolioUrl}
                </a>
                <Button
                  variant="link"
                  size="sm"
                  onClick={copyToClipboard}
                  className="ms-2"
                >
                  Copy
                </Button>
              </>
            ) : (
              "Loading..."
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserProfile;
