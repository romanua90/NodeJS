const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const errorMessages = require('../messages/error.messages');

const dbPath = path.join(process.cwd(), 'dataBase', 'users.json');

const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

/**
*@ findUsers - this is function to find all existing users
*@ findUserById - this is function to find user by id
*@ createUser - this is function for creating new user
*@ deleteUser - this is function for deleting selected user
* */

module.exports = {
    findUsers: async () => {
        const DB = await readFilePromise(dbPath);
        return JSON.parse(DB.toString());
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

    createUser: async (userObject, prefLang) => {
        const DB = await readFilePromise(dbPath);
        const users = JSON.parse(DB.toString());

        const found = users.find((user) => user.userId === userObject.userId);

        if (found) {
            throw new Error(errorMessages.USER_IS_EXIST[prefLang]);
        }

        users.push(userObject);
        return writeFilePromise(dbPath, JSON.stringify(users));
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
