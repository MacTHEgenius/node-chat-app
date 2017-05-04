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
        from: 'Admin',
        text: 'Greetings, chatter !',
        createdAt: new Date().getTime()
    });
    
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });
    
    socket.on('createMessage', (data) => {
        console.log('createMessage', data);
        // io.emit('newMessage', { 
        //     from: data.from, 
        //     text: data.text, 
        //     createdAt: new Date().getTime()
        // });
        socket.broadcast.emit('newMessage', { 
            from: data.from, 
            text: data.text, 
            createdAt: new Date().getTime()
        });
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