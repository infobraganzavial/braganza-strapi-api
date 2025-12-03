/**
 * servicio controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::servicio.servicio",
  ({ strapi }) => ({
    async findAll(ctx) {
      try {
        const servicios = await strapi.db
          .query("api::servicio.servicio")
          .findMany({
            where: { publishedAt: { $notNull: true } },
            populate: ["image"],
          });

        if (!servicios || servicios.length === 0) {
          return ctx.notFound("No se encontraron servicios");
        }

        const serviciosData = servicios.map((servicio) => ({
          title: servicio.title,
          description: servicio.description,
          image:
            servicio.image && servicio.image.url ? servicio.image.url : null,
        }));

        ctx.send(serviciosData);
      } catch (err) {
        strapi.log.error("Error fetching servicios:", err);
        ctx.badRequest("No se pudo obtener el contenido de los servicios");
      }
    },
  })
);
