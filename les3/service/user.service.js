const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const dbPath = path.join(process.cwd(), 'dataBase', 'users.json')
const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);


module.exports = {
    findUsers: async () => {
        const DB = await readFilePromise(dbPath);
        return JSON.parse(DB.toString());
    },


    findUserById: async (userId) => {
        const DB = await readFilePromise(dbPath);
        const users = JSON.parse(DB.toString());
        return users[userId];
    },

    createUser: async (userObject) => {
        const DB = await readFilePromise(dbPath);
        const users = JSON.parse(DB.toString());
        users.push(userObject);
        return writeFilePromise(dbPath, JSON.stringify(users));
    },

    deleteUser: async (userId) => {
        const DB = await readFilePromise(dbPath);
        const users = JSON.parse(DB.toString());
        users.splice(userId, 1);
        return writeFilePromise(dbPath, JSON.stringify(users));
    }
}