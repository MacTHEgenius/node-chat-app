const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

// Configure

const publicPath = path.join(__dirname, '../public');

var router = express();
var server = http.createServer(router);
var io = socketIO(server);
router.use(express.static(publicPath));

// Server

var users = new Users();

io.on('connection', (socket) => {
    console.log('New connection');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUsers(socket.id, params.name, params.room);
        
        io.to(params.room).emit('updateUserList', users.getUserListByRoom(params.room));
        socket.emit('newMessage', generateMessage('Admin', `Greetings, ${params.name} !`));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        
        callback();
    });

    socket.on('createMessage', (data, callback) => {
        io.emit('newMessage', generateMessage(data.from, data.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserListByRoom(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

// Listening...

const port = process.env.PORT || 3000;
const ip = process.env.IP;
server.listen(port, ip, () => {
    console.log(`Started at ${process.env.IP}:${process.env.PORT}`);
});
