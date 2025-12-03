/**
 * about-us controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::about-us.about-us",
  ({ strapi }) => ({
    async find(ctx) {
      try {
        const aboutUs = await strapi.db
          .query("api::about-us.about-us")
          .findOne({
            where: { publishedAt: { $notNull: true } },
            populate: ["background", "certificateISO"],
          });
        if (!aboutUs) {
          return ctx.notFound("About Us not found");
        }
        ctx.send({
          title: aboutUs.title,
          description: aboutUs.description,
          background: aboutUs.background
            ? { url: aboutUs.background.url }
            : null,
          certificateISO: aboutUs.certificateISO
            ? { url: aboutUs.certificateISO.url }
            : null,
        });
      } catch (err) {
        strapi.log.error("Error fetching About Us:", err);
        ctx.badRequest("Could not retrieve About Us content");
      }
    },
  })
);
