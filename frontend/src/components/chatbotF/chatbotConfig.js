import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar";

const botName = "ResumeAssist";
const initialmsg =
  "Hello There! How can i assist you with the candidate's resume.";

const config = {
  initialMessages: [createChatBotMessage(initialmsg)],
  botName: botName,
  customComponents: {
    header: () => (
      <div
        style={{
          backgroundColor: "grey",
          padding: "5px",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      >
        Chat with {botName}
      </div>
    ),
    botAvatar: (props) => <BotAvatar {...props} />,
  },
  customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "grey",
    },
    // Overrides the chat button styles
    chatButton: {
      backgroundColor: "grey",
    },
  },
};

export default config;
