const { User } = require('../model');
require('../model/House');
require('../model/Address');

/**
*@ findUsers - this is function to find all existing users
*@ findUserById - this is function to find user by id
*@ createUser - this is function for creating new user
*@ deleteUser - this is function for deleting selected user
* */

module.exports = {
    findUsers: (query) => User.find(query),

    createUser: (user) => User.create(user),

    findOneUser: (query) => User.findOne(query),

    findUserById: (userId) => User.findById(userId),

    deleteUser: (userId) => User.findByIdAndRemove(userId),
};
