const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public');
console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user Connected');

    // socket.emit('newEmail', {
    //     from: 'test@test.test',
    //     text: 'Email text',
    //     createdAt: 123
    // });

    socket.on('createEmail', (email) => {
        console.log('User created new email: ', email);
    });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app 2'));

    socket.broadcast.emit('createMessage', generateMessage('Admin', 'A new user has joined 2'));

    socket.on('createMessage', (newMessage, callback) => {
        console.log('User created new message: ', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        callback('This is from the server');
        // socket.broadcast.emit('createMessage', {
        //     from: newMessage.from,
        //     to: newMessage.to,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        console.log('createLocationMessage - coords: ', coords);
        io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Running on port ${port}`);
});