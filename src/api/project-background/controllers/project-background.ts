/**
 * project-background controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::project-background.project-background",

  ({ strapi }) => ({
    async find(ctx) {
      try {
        const projectBackground = await strapi.db
          .query("api::project-background.project-background")
          .findOne({
            where: { publishedAt: { $notNull: true } },
            populate: ["background"],
          });

        if (!projectBackground) {
          return ctx.notFound("Project Background not found");
        }

        ctx.send({
          background: projectBackground.background.url || null,
        });
      } catch (err) {
        strapi.log.error("Error fetching Project Background:", err);
        ctx.badRequest("Could not retrieve Project Background content");
      }
    },
  })
);
