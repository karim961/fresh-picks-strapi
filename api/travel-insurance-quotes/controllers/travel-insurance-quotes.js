"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

const jsonToTable = require("../../utils/table");
const sendEmail = require("../../utils/email");
const TEXT = require ('../../config/strings')

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["travel-insurance-quotes"].create(data, {
        files,
      });
    } else {
      entity = await strapi.services["travel-insurance-quotes"].create(
        ctx.request.body
      );
    }

    const departments = await strapi.services.departments.find();
    const subject = TEXT.EMAILS.TRAVEL_QUOTE_SUBJECT
    const body = jsonToTable(ctx.request.body);

    await sendEmail(departments.Sales, subject, body);

    return { success: true };
  },
};
