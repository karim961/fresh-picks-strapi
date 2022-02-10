'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async populateGridComponents(section) {
    if (!section.components || !section.components.length) {
      return section;
    }

    const GridComponentService = strapi.services['grid-component'];
    const GridComponentModel = strapi.models['grid-component'];

    return {
      ...section,
      components: await Promise.all(
        section.components.map(async ({ id }) => {
          const component = await GridComponentService.findOne({ id }, ['content']);

          return sanitizeEntity(component, { model: GridComponentModel });
        }),
      ),
    }
  },
};
