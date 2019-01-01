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

socket.on('newLocationMessage', function(message) {
    console.log('New message: ', message);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">Current location</a>');

    a.attr('href', message.fromUrl);

    li.text(`${message.from}: `);
    li.append(a);

    jQuery('#messages').append(li);
});

socket.on('createMessage', function(newMessage) {
    console.log('New message to send: ', newMessage);  
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

jQuery('#chatForm').on('submit', function(e) {
    e.preventDefault(); //prevents the default behavior for the event

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {
        console.log('Sent');
        jQuery('[name=message]').val('');
    });
});

var sendLocationButton = jQuery('#sendLocationButton');

sendLocationButton.on('click', function(e) {
    e.preventDefault(); //prevents the default behavior for the event

    if(!navigator.geolocation){    
        alert('Geolocation not supported by your browser');

        return;
    }

    navigator.geolocation.getCurrentPosition(function (position){
        console.log('position: ', JSON.stringify(position, undefined, 2));
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,            
        });
    }, function (){
        alert('Unable to fetch location');
    });
    console.log('SEND LOCATION BUTTON CLICKED');
});