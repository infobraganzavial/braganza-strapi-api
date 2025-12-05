export default {
  routes: [
    {
      method: "POST",
      path: "/contact-form",
      handler: "contact-form.sendEmail",
      config: {
        auth: false,
      },
    },
  ],
};
