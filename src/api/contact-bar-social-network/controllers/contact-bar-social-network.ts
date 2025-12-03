/**
 * contact-bar-social-network controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::contact-bar-social-network.contact-bar-social-network",

  ({ strapi }) => ({
    async findAll(ctx) {
      try {
        const contacts = await strapi.db
          .query("api::contact-bar-social-network.contact-bar-social-network")
          .findMany({
            where: { publishedAt: { $notNull: true } },
            populate: ["icon"],
          });

        if (!contacts || contacts.length === 0) {
          return ctx.notFound("No contact bars found");
        }

        ctx.send(
          contacts.map((contact) => ({
            icon: contact.icon?.url || null,
            url: contact.url || "",
          }))
        );
      } catch (err) {
        strapi.log.error("Error fetching contact bars:", err);
        ctx.badRequest("No se pudo obtener el contenido del contact bar");
      }
    },
  })
);
