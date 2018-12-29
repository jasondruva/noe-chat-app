const expect = require('expect');

const {generateMessage} = require('./../utils/message');

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