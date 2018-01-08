const expect = require("expect");
const {Users} = require("./users");

describe("Users", () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "George",
            room: "AAA"
        }, {
            id: "3",
            name: "Kate",
            room: "BBB"
        }, {
            id: "12",
            name: "Susan",
            room: "AAA"
        }];
    });

    it("should add new user", () => {
        var users = new Users();
        var user = {
            id: "1",
            name: "AAA",
            room: "123"
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it("should return names for AAA", () => {
        var userList = users.getUserList("AAA");
        expect(userList).toEqual(["George", "Susan"]);
    });

    it("should return names for BBB", () => {
        var userList = users.getUserList("BBB");
        expect(userList).toEqual(["Kate"]);
    });

    it("should find user", () => {
        expect(users.getUser("1")).toEqual(users.users[0]);
        expect(users.getUser("1")).not.toEqual(users.users[1]);
    });

    it("should not find user", () => {
        expect(users.getUser("1232312312")).toEqual(undefined);
    });

    it("should remove user", () => {
        var removedUser = users.users[0];
        expect(users.removeUser("1")).toEqual(removedUser);
        console.log(users.users);
        expect(users.users.length).toBe(2); 
    });

    it("should not remove user", () => {
        var usersList = users;
        usersList.removeUser("1231412");
        expect(usersList.users).toEqual(users.users);
    });
});