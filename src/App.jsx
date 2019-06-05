import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: []
    }
    this.socket = new WebSocket('ws://localhost:3001');
  }

  componentDidMount() {
    this.socket.onopen = () => {
      console.log('Connected To Server')
    }

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({
        messages: messages
      })
    }, 3000);
  }

  addMessage = (event) => {
    const content = event.target.value;
    if(event.key === "Enter" && content.length > 0) {
      const message = {
        username: this.state.currentUser.name,
        content
      };
      event.target.value = "";

      this.socket.send(JSON.stringify(message));
      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const messages = this.state.messages.concat(message);
        this.setState({
          messages: messages
        });
      }
    }
  };

  addUser = (event) => {
    const user = event.target.value;
    if(user.length > 0) {
      event.target.value = "";
      this.setState({
        currentUser: {name: user}
      });
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} addUser={this.addUser}/>
      </div>
    );
  }
}
export default App;
