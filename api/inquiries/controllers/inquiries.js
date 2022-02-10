"use strict";

const { parseMultipartData } = require("strapi-utils");
const sendEmail = require("../../utils/email");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    try {
      let entity;
      if (ctx.is("multipart")) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.inquiries.create(data, { files });
      } else {
        entity = await strapi.services.inquiries.create(ctx.request.body);
      }

      const departments = await strapi.services.departments.find();

      const { type: subject, message } = ctx.request.body;
      const recipient = departments.Support;
      await sendEmail(recipient, subject, message);

      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  },
};
