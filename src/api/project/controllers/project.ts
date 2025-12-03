/**
 * project controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::project.project",

  ({ strapi }) => ({
    async find(ctx) {
      try {
        const projects = await strapi.db
          .query("api::project.project")
          .findMany({
            where: { publishedAt: { $notNull: true } },
            populate: ["backgroundProject"],
          });

        ctx.send(
          projects.map((project) => ({
            id: project.id,
            titleProject: project.titleProject,
            placeDate: project.placeDate,
            backgroundProject: project.backgroundProject.url || null,
          }))
        );
      } catch (err) {
        strapi.log.error("Error fetching Projects:", err);
        ctx.badRequest("Could not retrieve Projects");
      }
    },
  })
);
