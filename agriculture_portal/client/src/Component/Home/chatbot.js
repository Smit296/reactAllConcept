import React, { Component } from "react";
import { Launcher } from "react-chat-window";

class Chatbot extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
      newMessagesCount: 0,
    };
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message],
      newMessagesCount: this.state.newMessagesCount + 1,
    });
    if (this.state.newMessagesCount === 0) {
      this._sendMessage("Welcome to Kisan Junction 😻", message);
    }
    if (this.state.newMessagesCount === 1)
      this._sendMessage("How are You", message);
    if (this.state.newMessagesCount === 2)
      this._sendMessage("Please Enter Your Name", message);
    if (this.state.newMessagesCount === 3)
      this._sendMessage("Kindly Provide Your Contact Number", message);
    if (this.state.newMessagesCount === 4)
      this._sendMessage("Kindly Provide Your Email ID", message);
    if (this.state.newMessagesCount === 5)
      this._sendMessage(
        "Thanx for visting our Website!! One of our reprenstative will contact you shortly",
        message
      );
  }

  _sendMessage(text, message) {
    if (text.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          message,
          {
            author: "them",
            type: "text",
            data: { text },
          },
        ],
      });
    }
  }

  render() {
    return (
      <>
        <Launcher
        className="mt-5"
          agentProfile={{
            teamName: "react-chat-window",
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          newMessagesCount={this.state.newMessagesCount}
          showEmoji
        />
      </>
    );
  }
}

export default Chatbot;
