const userService = require('../service/user.service');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userService.findUsers();
        res.json(users);
    },

    getSingleUser: async (req, res) => {
        const {userId} = req.params;
        const user = await userService.findUserById(userId);

        res.json(user);
    },
    createUser: async (req, res) => {
        const user = req.body;

        await userService.createUser(user);

        res.status(201).json('USER IS CREATED!');
    },
    deleteUser: async (req, res) => {
        const {userId} = req.params;
        const user = await userService.deleteUser(userId);

        res.json(user);
    }
}