const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { SPAM_EMAIL, SPAM_EMAIL_PASSWORD } = require('../config/config');
const { statusCodeEnum: statusCode } = require('../constant');
const templatesInfo = require('../email-template');
const { ErrorHandler } = require('../helper');
const { errorMessages } = require('../messages');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SPAM_EMAIL,
        pass: SPAM_EMAIL_PASSWORD
    }
});

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-template')
    }
});

const sendMail = async (email, action, context) => {
    try {
        const templateInfo = templatesInfo[action];

        if (!templateInfo) {
            throw new ErrorHandler(statusCode.BAD_REQUEST,
                errorMessages.INVALID_EMAIL_ACTION.customCode,
                errorMessages.INVALID_EMAIL_ACTION.en);
        }

        const html = await templateParser.render(templateInfo.templateName, context);

        return transport.sendMail({
            from: 'GSI_SPAM_EMAILER',
            to: email,
            subject: templateInfo.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};
