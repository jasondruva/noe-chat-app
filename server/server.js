const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

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

    // socket.emit('newMessage', {
    //     from: 'Jason',
    //     to: 'Sabrina',
    //     text: 'I will soon',
    //     createdAt: 345
    // });

    socket.on('createMessage', (newMessage) => {
        console.log('User created new message: ', newMessage);
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Running on port ${port}`);
});