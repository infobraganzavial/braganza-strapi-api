/**
 * contact-bar controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::contact-bar.contact-bar",

  ({ strapi }) => ({
    async find(ctx) {
      try {
        const contact = await strapi.db
          .query("api::contact-bar.contact-bar")
          .findOne({
            where: { publishedAt: { $notNull: true } },
            populate: ["iconEmail", "iconPhone", "iconWhatsapp"],
          });

        if (!contact) {
          return ctx.notFound("Contact bar not found");
        }

        ctx.send({
          iconEmail: contact.iconEmail.url,
          email: contact.email,
          iconPhone: contact.iconPhone.url,
          phone: contact.phone,
          iconWhatsapp: contact.iconWhatsapp.url,
          whatsapp: contact.whatsapp,
          whatsappMessage: contact.whatsappMessage,
        });
      } catch (err) {
        strapi.log.error("Error fetching contact bar:", err);
        ctx.badRequest("No se pudo obtener el contenido del contact bar");
      }
    },
  })
);
