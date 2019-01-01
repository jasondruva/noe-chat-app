const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./../utils/message');

describe('generateMessage', () => {
    it('Should generate the correct message object', () => {
        var from = 'Admin';
        var text = 'This is a test';        
        var newMessage = generateMessage(from, text);

        expect(newMessage.from).toBe(from);
        expect(newMessage.text).toBe(text);
        expect(typeof newMessage.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('Should generate the correct location message object', () => {
        var from = 'User';
        var lat = 45.6671194;
        var lon = -121.564724;
        var fromUrl = `https://maps.google.com?q=${lat},${lon}`;
        var newMessage = generateLocationMessage(from, lat, lon);

        expect(newMessage.from).toBe(from);    
        expect(newMessage.fromUrl).toBe(fromUrl);
        expect(typeof newMessage.createdAt).toBe('number');
    });
});