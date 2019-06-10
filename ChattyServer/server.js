const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const colors = ['#F9B5AC','#E8DAB2','#EE7674','#C0D6DF','EAEAEA','#E9FF70'];
const usedColors = [];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  const index = Math.floor(Math.random() * colors.length);
  console.log({type:'color', color: colors[index]});
  ws.send(JSON.stringify({type:'color', color: colors[index]}));
  usedColors.push(colors[index]);
  colors.splice(index, 1);

  wss.clients.forEach( client => {
    if (client.readyState === WebSocket.OPEN) {
      const count = {
          type: 'usersCount',
          count: wss.clients.size
      }
      client.send(JSON.stringify(count));
    }
  });

  ws.on('message', message => {
    var actualMessage = JSON.parse(message);
    actualMessage.id = uuidv1();

    if(actualMessage.type === 'postMessage') {
      actualMessage.type = 'incomingMessage';
    }

    if(actualMessage.type === 'postNotification') {
      actualMessage.type = 'incomingNotification';
    }

      wss.clients.forEach( client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(actualMessage));
        }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    colors.push(usedColors[0]);
    usedColors.shift();

    wss.clients.forEach( client => {
      if (client.readyState === WebSocket.OPEN) {
        const count = {
          type: 'usersCount',
          count: wss.clients.size
        }
        client.send(JSON.stringify(count));
      }
    });
  });
})


