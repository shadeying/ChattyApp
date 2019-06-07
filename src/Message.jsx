import React, {Component} from 'react';

function Message(props) {
  const style = {color: props.color};
  return (
    <div>
      {props.type === "incomingMessage" &&
        <div className="message">
          <span className="message-username" style={style}>{props.username}</span>
          <span className="message-content">{props.content}</span>
        </div>
      }
      {props.image && <img className="message-image" src={props.image} />}
      {props.type === "incomingNotification" &&
        <div className="notification">
          <span className="notification-content">{props.content}</span>
        </div>
      }
    </div>
  );
}
export default Message;
