"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const sendEmail = require("../../utils/email");

module.exports = {
  async send(ctx, from) {
    try {
      const departments = await strapi.services.departments.find();

      const { subject, body } = ctx.request.body;
      const receiver = departments.Support;
      await sendEmail(receiver, subject, body, from);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  },
};
