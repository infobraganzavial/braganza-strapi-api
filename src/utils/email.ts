// src/utils/email.ts
import sgMail from "@sendgrid/mail";
import fs from "fs";
import path from "path";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

type Replacements = Record<string, string | number>;

type SendEmailParams = {
  to: string;
  subject: string;
  templateName: string; // ej: "contact.html"
  replacements?: Replacements; // ej: { name, email, subject, message }
  replyTo?: string;
};

function loadTemplate(templateName: string) {
  const templatePath = path.join(
    process.cwd(),
    "public/email-templates",
    templateName
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Email template not found: ${templatePath}`);
  }

  return fs.readFileSync(templatePath, "utf8");
}

function applyReplacements(html: string, replacements?: Replacements) {
  if (!replacements) return html;

  for (const key of Object.keys(replacements)) {
    html = html.replace(
      new RegExp(`{{${key}}}`, "g"),
      String(replacements[key])
    );
  }

  return html;
}

export default {
  sendEmail: async ({
    to,
    subject,
    templateName,
    replacements,
    replyTo,
  }: SendEmailParams) => {
    const fromEmail = process.env.SENDGRID_FROM;
    if (!fromEmail) throw new Error("Missing env var: SENDGRID_FROM");

    // 1) Leer template
    let html = loadTemplate(templateName);

    // 2) Reemplazar {{variables}}
    html = applyReplacements(html, replacements);

    // 3) Construir mensaje
    const msg: any = {
      to,
      from: {
        email: fromEmail,
        name: process.env.SENDGRID_FROM_NAME || "No-Reply",
      },
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    };

    // 4) Enviar
    await sgMail.send(msg);
    console.log(`✅ Correo enviado a ${to}`);
  },
};
