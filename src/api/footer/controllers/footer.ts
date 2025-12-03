/**
 * footer controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::footer.footer",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const footer = await strapi.db.query("api::footer.footer").findOne({
          where: { publishedAt: { $notNull: true } },
        });

        if (!footer) {
          return ctx.notFound("Footer not found");
        }

        ctx.send({
          slogan: footer.slogan || null,
          address: footer.address || null,
        });
      } catch (err) {
        strapi.log.error("Error fetching Footer:", err);
        ctx.badRequest("Could not retrieve Footer content");
      }
    },
  })
);
