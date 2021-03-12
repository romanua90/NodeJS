const { emailActionEnum: emailAction, statusCodeEnum: statusCode } = require('../constant');
const { passwordHasher } = require('../helper');
const { errorMessages } = require('../messages');
const { authService, emailService, userService } = require('../service');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const filter = req.query;

            delete filter.preferL;

            const users = await userService.findUsers(filter);

            res.status(statusCode.OK).json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { preferL = 'en' } = req.query;
            const { email, password } = req.body;

            const hashPassword = await passwordHasher.hash(password);

            const allUsers = await userService.findUsers();

            const allEmails = [];
            allUsers.forEach((user) => {
                allEmails.push(user.email);
            });

            await userService.createUser({ ...req.body, password: hashPassword });

            const { full_name } = await userService.findOneUser({ email });

            await emailService.sendMail(email, emailAction.ACCOUNT_CREATED, { name: full_name });

            await emailService.sendMail(allEmails, emailAction.NEW_MEMBER, { name: full_name });

            res.status(statusCode.CREATED).json(errorMessages.USER_CREATED[preferL]);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { email, full_name } = req.user;

            const user = await userService.findUserById(userId);
            const date = new Date().toLocaleString();

            await emailService.sendMail(email, emailAction.ACCOUNT_INFO_ACCESSED, { name: full_name, date });

            res.status(statusCode.OK).json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteSingleUser: async (req, res, next) => {
        try {
            const { preferL = 'en' } = req.query;
            const { userId } = req.params;
            const { _id, email, full_name } = req.user;

            await authService.deleteAllUserTokens(_id);

            await userService.deleteUser(userId);

            await emailService.sendMail(email, emailAction.ACCOUNT_DELETED, { name: full_name });

            res.status(statusCode.OK).json(errorMessages.USER_DELETED[preferL]);
        } catch (e) {
            next(e);
        }
    },
};
