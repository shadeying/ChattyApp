import React, {Component} from 'react';

function ChatBar(props) {
  return (
    <footer className="chatbar">
      <input className="chatbar-username" placeholder={props.currentUser.name} onBlur={props.addUser}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={props.addMessage} />
    </footer>
  );
}
export default ChatBar;