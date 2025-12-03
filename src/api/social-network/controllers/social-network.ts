/**
 * social-network controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::social-network.social-network",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const socialNetworks = await strapi.db
          .query("api::social-network.social-network")
          .findMany({
            where: { publishedAt: { $notNull: true } },
            populate: ["icon"],
          });

        ctx.send(
          socialNetworks.map((network) => ({
            icon: network.icon.url || null,
            url: network.url,
          }))
        );
      } catch (err) {
        strapi.log.error("Error fetching Social Networks:", err);
        ctx.badRequest("Could not retrieve Social Networks");
      }
    },
  })
);
