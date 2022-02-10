"use strict";

const sendEmail = async (to, subject, body, from = "admin@strapi.io") => {
  console.log("sending email");
  await strapi.plugins["email"].services.email.send({
    to: to,
    from: from,
    subject: subject,
    text: body,
  });
  console.log("Email Sent")
};

module.exports = sendEmail;
