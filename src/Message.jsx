import React, {Component} from 'react';

function Message(props) {
  return (
    <div>
      <div className="message">
        <span className="message-username">{props.type === "incomingMessage" && props.username}</span>
        <span className="message-content">{props.type === "incomingMessage" && props.content}</span>
      </div>
      <div className="notification">
        <span className="notification-content">{props.type === "incomingNotification" && props.content}</span>
      </div>
    </div>
  );
}
export default Message;
