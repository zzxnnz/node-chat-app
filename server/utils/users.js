[{
    id: 1,
    name: "Rusya",
    room: 2
},{
    id: 2,
    name: "Aron",
    room: 3
}]

class Users {
    constructor() {
        this.users = [];
    }   
    
    addUser(id, name, room) {
        var user = {
            id,
            name,
            room
        }
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);
        if(user) {
            this.users = this.users.filter((user) => {
                return user.id !== id;
            });
        }

        return user;
    }

    getUser(id) {
        var users = this.users.filter((user) => {
            return user.id === id;
        });

        return users[0];
    }
    
    // Get user name in the same room
    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}


module.exports = {
    Users
}