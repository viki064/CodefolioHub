import ChatAPIService from "../../APIServices/APIService";
// MessageParser starter code
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
    this.email = "modiyam.vikram@gmail.com";
  }

  parse(message) {
    ChatAPIService.ChatMsg(this.email, { user: message })
      .then((resp) => this.actionProvider.msgReplyHandler(resp.Assistant))
      .catch((error) => console.log(error));
  }
}

export default MessageParser;
