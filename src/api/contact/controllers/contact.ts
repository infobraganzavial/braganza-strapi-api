/**
 * contact controller
 */
import { factories } from "@strapi/strapi";
import emailService from "../../../utils/email";

export default factories.createCoreController(
  "api::contact.contact",
  ({ strapi }) => ({
    async sendEmail(ctx) {
      const body = (ctx.request.body as any)?.data ?? ctx.request.body;
      const { name, email, subject, message } = body || {};

      if (!email) return ctx.badRequest("Email is required");
      if (!message) return ctx.badRequest("Message is required");

      const year = new Date().getFullYear();
      const safeName = (name || "").toString().trim();

      try {
        //Email a braganza
        await emailService.sendEmail({
          to: process.env.CONTACT_INBOX || process.env.SENDGRID_FROM!,
          subject: subject || "Nuevo mensaje de contacto",
          templateName: "email.html",
          replacements: {
            name: safeName || "Sin nombre",
            email,
            subject: subject || "Sin asunto",
            message,
            year,
          },
          replyTo: email,
        });

        // Auto-respuesta al usuario
        await emailService.sendEmail({
          to: email,
          subject: "Recibimos tu mensaje",
          templateName: "customer-response.html",
          replacements: {
            name: safeName ? ` ${safeName}` : "",
            subject: subject || "Sin asunto",
            message,
            year,
          },
          replyTo: process.env.CONTACT_INBOX || process.env.SENDGRID_FROM!,
        });

        ctx.send({ message: "Emails sent successfully" });
      } catch (err) {
        strapi.log.error("Error sending email:", err);
        ctx.badRequest("Could not send email");
      }
    },
  })
);
