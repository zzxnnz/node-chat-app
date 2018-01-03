const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit("newMessage", {
        from: "mike",
        text: "hello",
        createdAt: 123
    });

    socket.on("createMessage", (message) => {
        console.log(message);
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
