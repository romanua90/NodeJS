const errorMessages = require('../messages/error.messages');
const User = require('../dataBase/model/User');

/**
*@ findUsers - this is function to find all existing users
*@ findUserById - this is function to find user by id
*@ createUser - this is function for creating new user
*@ deleteUser - this is function for deleting selected user
* */

module.exports = {
    findUsers: async (query, preferL) => {
        if (!query) {
            return User.find();
        }
        const find = await User.find(query);

        if (!find.length) {
            throw new Error(errorMessages.USER_NOT_FOUND[preferL]);
        }

        return find;
    },

    findUserById: async (userId, prefLang) => {
        const DB = await readFilePromise(dbPath);
        const users = JSON.parse(DB.toString());

        const found = users.find((user) => user.userId === userId);

        if (!found) {
            throw new Error(errorMessages.USER_NOT_FOUND[prefLang]);
        }

        return users[userId];
    },

    createUser: async (user) => {
        await User.create(user);
    },

    deleteUser: async (userId, prefLang) => {
        const DB = await readFilePromise(dbPath);
        const users = JSON.parse(DB.toString());
        users.splice(userId, 1);

        if (users.splice(userId, 1)) {
            writeFilePromise(dbPath, JSON.stringify(users));
            throw new Error(errorMessages.USER_DELETED[prefLang]);
        }
    }
};
