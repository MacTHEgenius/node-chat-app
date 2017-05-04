const expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    
    it('should generate the correct message object', () => {
        var from = 'Legolas';
        var text = 'Shall I describe it to you? Or would you like me to find you a box? ';
        
        var result = generateMessage(from, text);
        
        expect(result).toInclude({ from, text });
        expect(result.createdAt).toBeA('number');
    });
    
});

describe('generateLocationMessage', () => {
    
    it('should generate corrent location object', () => {
        var from = "Legolas";
        var lat = 1;
        var lng = 2;
        var expectedUrl = 'https://www.google.com/maps?q=1,2';
        
        var result = generateLocationMessage(from, lat, lng);
        
        expect(result).toInclude({ from, url: expectedUrl });
        expect(result.createdAt).toBeA('number');
    });
    
});