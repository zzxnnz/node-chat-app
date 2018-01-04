var expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate correct message object", () => {
        var from = "Ruslan";
        var text = "Hello world!";
        var message = generateMessage(from, text);

        expect(message).toMatchObject({
            from,
            text
        });
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof message.createdAt).toBe("number");
    });
});

describe("generateLocationMessage", () => {
    it("should generate correct location object", () => {
        var from = "Ruslan";
        var latitude = 37.6086488;
        var longitude = 127.0021178;

        var locationMessage = generateLocationMessage(from, latitude, longitude);
        expect(locationMessage.url).toBe(`https://google.com/maps?q=${latitude},${longitude}`);
        expect(locationMessage.from).toBe(from);
        expect(typeof locationMessage.url).toBe("string");
        expect(typeof locationMessage.createdAt).toBe("number");
    });
});