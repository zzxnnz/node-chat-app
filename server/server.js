const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on("connection", (socket) => {
    socket.emit("newMessage", generateMessage("Администратор", "Добро пожаловать!"));

    socket.broadcast.emit("newMessage", generateMessage("Администратор", "Новый пользователь подключился!"));

    socket.on("createMessage", (message, callback) => {
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback();
    });

    socket.on("createLocationMessage", (position, callback) => {
        io.emit("newLocationMessage", generateLocationMessage("Пользователь", position.latitude, position.longitude));
        callback();
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("newMessage", generateMessage("Администратор", "Пользователь отключился"))
    });
});

if(!module.parent) {
    server.listen(port, () => {
        console.log("Started at port", port);
    });
}
