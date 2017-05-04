const expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
    
    it('should generate the correct message object', () => {
        var from = 'Legolas';
        var text = 'Shall I describe it to you? Or would you like me to find you a box? ';
        
        var result = generateMessage(from, text);
        
        expect(result).toInclude({ from, text });
        expect(result.createdAt).toBeA('number');
    });
    
});