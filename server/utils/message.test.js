const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', ()=> {
    var from = 'Keshav';
    var text = 'message testing';
    var message = generateMessage(from, text);
    expect(message.from).toBe(from),
    expect(message.text).toBe(text),
    expect(message.createdAt).toBeA('number'),
    expect(message).toInclude({from, text});
  });
});
