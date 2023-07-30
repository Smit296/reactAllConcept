const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const cors = require('cors');
const { Socket } = require('net');

const port = 4000;

const nodeData = [
  {
  "nodePrice":200,
  "nodeName":"Node1"
  },
  {
  "nodePrice":300,
  "nodeName":"Node2"
  },
  {
  "nodePrice":400,
  "nodeName":"Node3"
  },
]
app.use(cors())
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.emit('NODE_ROOM', nodeData);

  socket.on('DELETE_NODE', (id)=>{
    console.log('Deleted node Id:',id)
    nodeData.splice(id, 1);

  socket.emit('NODE_ROOM', nodeData);
  }
);

//   socket.on('message', (data) => {
//     console.log('Message received:', data);
//     io.emit('message', data); // Broadcast the message to all connected clients
//   });

//   socket.on('WELCOME', (data) =>{
//     console.log('Welcome message received:',data)
//     io.emit('message','Thank you');
//   })

    
  // socket.on('WELCOM', (data) =>{
  //   console.log('Welcome message received:',data)
  //   io.emit('message','Thank you');
  // })
  
//   socket.on('WELCOME2', (data) =>{
//     console.log('Welcome message received:',data)
//     io.emit('message','Thank you2');
//   })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
