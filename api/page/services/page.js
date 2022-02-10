'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async populateNestedDZ(page) {
    const { populateGridComponents } = strapi.services['grid-component'];
    const { populateTabs } = strapi.services['tabs'];

    return {
      ...page,
      Sections: await Promise.all(
        page.Sections.map(async section => {
          if (section.__component === 'section.grid-block') {
            return populateGridComponents(section);
          }else if(section.__component === 'section.product-block') {
            return populateTabs(section);
          }
          return section;
        }),
      ),
    };
  },
};
