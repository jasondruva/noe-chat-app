var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createEmail', {
    //     from: 'Sabrina',
    //     to: 'Jason',
    //     text: 'This is a new email'
    // });

    // socket.emit('createMessage', {
    //     from: 'Sabrina',
    //     to: 'Jason',
    //     text: 'Do the recycling this weekend'
    // });
});

socket.on('newEmail', function(email) {
    console.log('New email: ', email);
});

socket.on('createEmail', function(newEmail) {
    console.log('New email to send: ', newEmail);
});

socket.on('newMessage', function(message) {
    console.log('New message: ', message);
});

socket.on('createMessage', function(newMessage) {
    console.log('New message to send: ', newMessage);    
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});