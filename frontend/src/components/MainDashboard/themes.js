import { Switch } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Alert, Badge } from "react-bootstrap";
import { BACKEND_URL } from "../../staticComponents/constant";
import APIService from "../../APIServices/APIService";

const THEME_OPTIONS = [
  {
    id: "classic",
    name: "Classic Professional",
    description: "Traditional layout with timeline-based work experience. Perfect for corporate professionals and consultants.",
    features: ["Timeline view", "Animated sections", "Clean typography"],
    preview: "📄"
  },
  {
    id: "modern",
    name: "Modern Minimalist",
    description: "Sleek, card-based design with emphasis on visual hierarchy. Great for designers and creatives.",
    features: ["Card layouts", "Gradient accents", "Spacious design"],
    preview: "🎨"
  },
  {
    id: "developer",
    name: "Developer Portfolio",
    description: "Tech-focused theme with code-like aesthetics. Ideal for software engineers and developers.",
    features: ["Monospace fonts", "Dark mode ready", "Project showcase"],
    preview: "💻"
  },
  {
    id: "creative",
    name: "Creative Bold",
    description: "Vibrant, personality-driven layout with bold colors. Perfect for artists and marketers.",
    features: ["Bold colors", "Large imagery", "Dynamic animations"],
    preview: "✨"
  },
  {
    id: "executive",
    name: "Executive Elite",
    description: "Premium, sophisticated design for senior professionals. Best for executives and leaders.",
    features: ["Elegant typography", "Professional polish", "Refined spacing"],
    preview: "👔"
  }
];

function Themes(props) {
  const dark = props.dark;
  const [selectedTheme, setSelectedTheme] = useState("classic");
  const [currentTheme, setCurrentTheme] = useState("");
  const [is_ChatBot, setIs_ChatBot] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    // Load user details and current theme
    APIService.loadUser()
      .then((resp) => {
        setUserEmail(resp.email);
        // Load existing resume to check current theme
        APIService.loadResume(resp.email)
          .then((resumeResp) => {
            const theme = resumeResp.selectedTheme || "classic";
            const chatbot = resumeResp.enableChatbot !== undefined ? resumeResp.enableChatbot : true;
            setSelectedTheme(theme);
            setCurrentTheme(theme);
            setIs_ChatBot(chatbot);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChatBot = () => {
    setIs_ChatBot(!is_ChatBot);
  };

  const handlePublish = async (themeId) => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const updateResponse = await fetch(`${BACKEND_URL}update-theme`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          theme: themeId,
          enableChatbot: is_ChatBot
        }),
      });

      const updateData = await updateResponse.json();

      if (updateData.success) {
        setCurrentTheme(themeId);
        setMessage({
          type: "success",
          text: `Successfully applied "${THEME_OPTIONS.find(t => t.id === themeId).name}" theme!`
        });
      } else {
        setMessage({ type: "danger", text: updateData.message || "Failed to apply theme" });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "danger", text: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className={dark ? "text-white" : "text-dark"}>Portfolio Themes</h3>
      <p className={dark ? "text-light" : "text-muted"}>
        Choose a theme that best represents your professional style
      </p>

      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: "", text: "" })}>
          {message.text}
        </Alert>
      )}

      <div className="mb-4 p-3 border rounded">
        <label className={dark ? "text-white" : "text-dark"}>
          <strong>Global Settings:</strong>
        </label>
        <div className="mt-2">
          <span className={dark ? "text-light" : "text-dark"}>Enable AI Chatbot: </span>
          <Switch
            checked={is_ChatBot}
            onChange={handleChatBot}
            name="chatbot"
            color="primary"
          />
          <small className={dark ? "text-muted" : "text-secondary"}>
            {is_ChatBot ? " Visitors can chat with AI about your experience" : " Chatbot disabled"}
          </small>
        </div>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        {THEME_OPTIONS.map((theme) => (
          <Col key={theme.id}>
            <Card
              className={`h-100 ${dark ? "bg-dark text-white border-secondary" : ""} ${
                selectedTheme === theme.id ? "border-primary border-3" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedTheme(theme.id)}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <Card.Title>
                    <span className="fs-1 me-2">{theme.preview}</span>
                    {theme.name}
                  </Card.Title>
                  {currentTheme === theme.id && (
                    <Badge bg="success">Active</Badge>
                  )}
                </div>
                <Card.Text className="mt-2">{theme.description}</Card.Text>
                <hr />
                <div className="mb-3">
                  <strong>Features:</strong>
                  <ul className="mt-2">
                    {theme.features.map((feature, idx) => (
                      <li key={idx}><small>{feature}</small></li>
                    ))}
                  </ul>
                </div>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button
                  variant={selectedTheme === theme.id ? "primary" : "outline-primary"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePublish(theme.id);
                  }}
                  disabled={loading || currentTheme === theme.id}
                >
                  {loading && selectedTheme === theme.id
                    ? "Applying..."
                    : currentTheme === theme.id
                    ? "Current Theme"
                    : "Apply Theme"}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Themes;
