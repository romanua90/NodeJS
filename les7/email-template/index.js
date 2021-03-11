const { emailActionEnum } = require('../constant');

module.exports = {
    [emailActionEnum.ACCOUNT_CREATED]: {
        templateName: 'created',
        subject: 'Welcome on board'
    },

    [emailActionEnum.NEW_MEMBER]: {
        templateName: 'new-member',
        subject: 'We have a new member'
    },

    [emailActionEnum.ACCOUNT_ACCESSED]: {
        templateName: 'user-access',
        subject: 'Your account was accessed'
    },

    [emailActionEnum.ACCOUNT_INFO_ACCESSED]: {
        templateName: 'user-access-info',
        subject: 'Your account info was accessed'
    },

    [emailActionEnum.ACCOUNT_DELETED]: {
        templateName: 'user-deleted',
        subject: 'Your account was deleted'
    },

};
