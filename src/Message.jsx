import React, {Component} from 'react';

function Message(props) {
  const style = {color: props.color};
  return (
    <div>
      <div className="message">
        <span className="message-username" style={style}>{props.type === "incomingMessage" && props.username}</span>
        <span className="message-content">{props.type === "incomingMessage" && props.content}</span>
      </div>
      <div className="notification">
        <span className="notification-content">{props.type === "incomingNotification" && props.content}</span>
      </div>
    </div>
  );
}
export default Message;
