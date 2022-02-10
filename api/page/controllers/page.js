'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {
    let entities;
    const { query } = ctx;

    if (!query._sort) {
      query._sort = 'link:ASC';
    }

    if (ctx.query._q) {
      entities = await strapi.services.page.search(ctx.query);
    } else {
      entities = await strapi.services.page.find(ctx.query);
    }

    const pages = entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.page })
    );

    return Promise.all(
      pages.map(async page =>
        strapi.services.page.populateNestedDZ(page)
      ),
    );
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.page.findOne({ id });
    const page = sanitizeEntity(entity, { model: strapi.models.page });

    return strapi.services.page.populateNestedDZ(page);
  },
};
