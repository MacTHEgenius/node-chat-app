const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');

// Configure

const publicPath = path.join(__dirname, '../public');

var router = express();
var server = http.createServer(router);
var io = socketIO(server);
router.use(express.static(publicPath));

// Server

io.on('connection', (socket) => {
    console.log('New connection');

    socket.emit('newMessage', generateMessage('Admin', 'Greetings, chatter !'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (data, callback) => {
        console.log('createMessage', data);
        io.emit('newMessage', generateMessage(data.from, data.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
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
