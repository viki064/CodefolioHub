import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col, Button, Alert, Spinner } from "react-bootstrap";
import { FRONTEND_URL, BACKEND_URL } from "../../staticComponents/constant";
import APIService from "../../APIServices/APIService";

function Home() {
  const [slug, setSlug] = useState("");
  const [currentSlug, setCurrentSlug] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [publishedUrl, setPublishedUrl] = useState("");

  useEffect(() => {
    // Load user details and current slug
    APIService.loadUser()
      .then((resp) => {
        setUserEmail(resp.email);
        // Load existing resume to check if slug exists
        APIService.loadResume(resp.email)
          .then((resumeResp) => {
            if (resumeResp.customSlug) {
              setCurrentSlug(resumeResp.customSlug);
              setSlug(resumeResp.customSlug);
              setPublishedUrl(`${FRONTEND_URL}${resumeResp.customSlug}`);
            } else {
              setPublishedUrl(`${FRONTEND_URL}${resp.email}`);
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate slug
    if (!slug || slug.trim() === "") {
      setMessage({ type: "danger", text: "Please enter a valid identifier" });
      return;
    }

    // Validate slug format (alphanumeric and hyphens only)
    const slugPattern = /^[a-z0-9-]+$/;
    if (!slugPattern.test(slug)) {
      setMessage({
        type: "danger",
        text: "Identifier can only contain lowercase letters, numbers, and hyphens"
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Check if slug is available
      const checkResponse = await fetch(`${BACKEND_URL}check-slug/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const checkData = await checkResponse.json();

      if (!checkData.available && slug !== currentSlug) {
        setMessage({ type: "danger", text: "This identifier is already taken. Please try another one." });
        setLoading(false);
        return;
      }

      // Update the slug
      const updateResponse = await fetch(`${BACKEND_URL}update-slug`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, slug: slug }),
      });

      const updateData = await updateResponse.json();

      if (updateData.success) {
        setCurrentSlug(slug);
        setPublishedUrl(`${FRONTEND_URL}${slug}`);
        setMessage({
          type: "success",
          text: "Your portfolio URL has been published successfully!"
        });
      } else {
        setMessage({ type: "danger", text: updateData.message || "Failed to publish URL" });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "danger", text: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSlugChange = (e) => {
    // Convert to lowercase and replace spaces with hyphens
    const value = e.target.value.toLowerCase().replace(/\s+/g, '-');
    setSlug(value);
  };

  return (
    <>
      <Container className="m-5 p-5 border shadow-md rounded">
        <h4>Create a Unique Portfolio URL:</h4>
        <p className="text-muted">Choose a custom identifier for your portfolio URL that's easy to share</p>
        <br />

        {message.text && (
          <Alert variant={message.type} dismissible onClose={() => setMessage({ type: "", text: "" })}>
            {message.text}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2" className="h5">
              {FRONTEND_URL}
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="text"
                placeholder="your-unique-identifier"
                value={slug}
                onChange={handleSlugChange}
                disabled={loading}
              />
              <Form.Text className="text-muted">
                Use lowercase letters, numbers, and hyphens only
              </Form.Text>
            </Col>
            <Col sm="4">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Publishing...
                  </>
                ) : (
                  "Publish The URL"
                )}
              </Button>
            </Col>
          </Form.Group>
        </Form>

        {publishedUrl && (
          <div className="mt-4 p-3 bg-light rounded">
            <h5>Your Published Portfolio URL:</h5>
            <a href={publishedUrl} target="_blank" rel="noopener noreferrer" className="h6">
              {publishedUrl}
            </a>
          </div>
        )}
      </Container>
    </>
  );
}

export default Home;
