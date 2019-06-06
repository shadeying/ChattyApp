import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("MessageList props: ", this.props)
    const messages = this.props.messages.map(message =>
      <Message key={message.id} {...message} />
    );
    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}
export default MessageList;
