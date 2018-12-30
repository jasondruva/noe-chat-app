var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

// socket.emit('createMessage', {
//     from: 'Jason',
//     text: 'Test event acknowledgements'
// }, (data) => {
//     console.log(data);
// });

socket.on('newEmail', function(email) {
    console.log('New email: ', email);
});

socket.on('createEmail', function(newEmail) {
    console.log('New email to send: ', newEmail);
});

socket.on('newMessage', function(message) {
    console.log('New message: ', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('createMessage', function(newMessage) {
    console.log('New message to send: ', newMessage);  
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});