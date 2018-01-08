const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    socket.on("join", (params, callback) => {
        if(isRealString(params.name) && isRealString(params.room)) {
            socket.join(params.room);
            users.removeUser(socket.id)
            users.addUser(socket.id, params.name, params.room);
            io.to(params.room).emit("updateUserList", users.getUserList(params.room));

            socket.emit("newMessage", generateMessage("Администратор", "Добро пожаловать!"));
            socket.broadcast.to(params.room).emit("newMessage", generateMessage("Администратор", `${params.name} подключился!`));
            callback();
        } else {
            callback("Ошибка в имени или в названии комнате");
        } 
    });

    socket.on("createMessage", (message, callback) => {
        io.emit("newMessage", generateMessage(message.from, message.text));
        callback();
    });

    socket.on("createLocationMessage", (position, callback) => {
        io.emit("newLocationMessage", generateLocationMessage("Пользователь", position.latitude, position.longitude));
        callback();
    });

    socket.on("disconnect", () => {
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Администратор", `${user.name} отключился`));
        }
    });
});

if(!module.parent) {
    server.listen(port, () => {
        console.log("Started at port", port);
    });
}
