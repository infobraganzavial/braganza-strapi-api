/**
 * carousel controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::carousel.carousel",

  ({ strapi }) => ({
    async findAll(ctx) {
      try {
        const carousel = await strapi.db
          .query("api::carousel.carousel")
          .findOne({
            where: { publishedAt: { $notNull: true } },
            populate: ["image"],
          });

        if (!carousel || carousel.length === 0) {
          return ctx.notFound("Carousel not found");
        }

        const images = carousel.image.map((media) => ({ url: media.url }));
        ctx.send({
          images,
        });
      } catch (err) {
        strapi.log.error("Error fetching carousel:", err);
        ctx.badRequest("No se pudo obtener el contenido del carrusel");
      }
    },
  })
);
