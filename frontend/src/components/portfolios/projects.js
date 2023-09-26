import React from "react";
import { Container, Row } from "react-bootstrap";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
} from "@mui/lab";
import Typography from "@mui/material/Typography";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import SchoolIcon from "@mui/icons-material/School";
import ExpDisp from "./expDisp";

function Projects(props) {
  const education = props.work.Education;
  const works = Array.from(new Set(props.work.WorkExperience));
  // const [selectedWorkID, setSelectedWorkID] = useState();
  // const [showResp, setShowResp] = useState(false);
  // const selectedWork = selectedWorkID
  //   ? works.find((item) => item.id === selectedWorkID)
  //   : null;

  return (
    <Container className="mt-5 p-4 shadow-lg rounded">
      <Row
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        <h4 className="text-decoration-underline">
          Education & Work Experience
        </h4>
      </Row>
      <Row
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        <p>
          <strong>Note: </strong> Click on the Company name for more details.
        </p>
      </Row>
      <div>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              <Typography>Graduation</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <SchoolIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "40px", px: 2 }}>
              <Typography>{education}</Typography>
            </TimelineContent>
          </TimelineItem>
          {works.map((item) => {
            return (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot>
                    <LaptopMacIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "40px", px: 2 }}>
                  <Typography>
                    <ExpDisp work={item} />
                    <br />
                    {item.StartDate + " - " + item.EndDate}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
    </Container>
  );
}

export default Projects;
