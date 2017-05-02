const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Configure

const publicPath = path.join(__dirname, '../public');

var router = express();
var server = http.createServer(router);
var io = socketIO(server);
router.use(express.static(publicPath));

// Server

io.on('connection', (socket) => {
    console.log('New connection');
    
    socket.emit('newMessage', { 
        from: 'macthegenius', 
        text: 'Hey you ! Hello world !', 
        createdAt: 123123
    });
    
    socket.on('createMessage', (data) => {
        console.log('createMessage', data);
    });
    
    socket.on('disconnect', (socket) => {
        console.log('A disconnection occured');
    });
});

// Listening...

const port = process.env.PORT || 3000;
const ip = process.env.IP;
server.listen(port, ip, () => {
    console.log(`Started at ${process.env.IP}:${process.env.PORT}`);
});