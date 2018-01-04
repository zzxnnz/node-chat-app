const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage} = require("./utils/message");

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!"));

    socket.broadcast.emit("newMessage", generateMessage("Admin", "New User joined!"));

    socket.on("createMessage", (message) => {
        console.log(message);
        io.emit("newMessage", generateMessage(message.from, message.text));
    })

    socket.on("disconnect", () => {
        console.log("User has been disconnected");
    });
});

if(!module.parent) {
    server.listen(port, () => {
        console.log("Started at port", port);
    });
}
