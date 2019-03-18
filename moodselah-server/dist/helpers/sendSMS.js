"use strict";
// import Twilio from "twilio";
Object.defineProperty(exports, "__esModule", { value: true });
// const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
var sendSMS = function (to, body) {
    /*
    return twilioClient.messages.create({
      body,
      to,
      from: process.env.TWILIO_PHONE
    });
    */
};
exports.sendVerificationSMS = function (to, key) {
    return sendSMS(to, "Your verification key is: " + key);
};
//# sourceMappingURL=sendSMS.js.map