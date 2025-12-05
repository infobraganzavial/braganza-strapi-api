/**
 * client controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::client.client",
  ({ strapi }) => ({
    async findAll(ctx) {
      try {
        const clients = await strapi.db.query("api::client.client").findMany({
          where: { publishedAt: { $notNull: true } },
          populate: ["logo"],
        });

        if (!clients || clients.length === 0) {
          return ctx.notFound("No clients found");
        }

        ctx.send(
          clients.map((client) => ({
            logo: client.logo?.url || null,
          }))
        );
      } catch (error) {
        ctx.throw(500, "Internal Server Error");
      }
    },
  })
);
