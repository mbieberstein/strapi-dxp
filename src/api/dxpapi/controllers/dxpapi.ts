/**
 * A set of functions called "actions" for `dxpapi`
 */

export default {
  exampleAction: async (ctx, next) => {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },

  update: async (ctx, next) => {

    try {

      const id = ctx.request.params.id

      const result = await strapi.entityService.update('api::page.page', id, ctx.request.body)

      ctx.body = result

    } catch (err) {
      ctx.body = err;
    }

  }
};
