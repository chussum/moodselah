"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import Mailgun from "mailgun-js";
/*
const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandbox6dc95a40763144f59f34911bf0fb8eaf.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "itnico.las.me@gmail.com",
    to: "itnico.las.me@gmail.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};
*/
exports.sendVerificationEmail = function (nick, key) {
    // const emailSubject = `Hello! ${nick}, please verify your email`;
    // const emailBody = `Verify your email by clicking <a href="http://moodselah.com/verification/${key}/">here</a>`;
    // return sendEmail(emailSubject, emailBody);
};
//# sourceMappingURL=sendEmail.js.map