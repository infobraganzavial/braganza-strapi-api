export default {
  routes: [
    {
      method: "GET",
      path: "/contact-bar",
      handler: "contact-bar.find",
      config: {
        auth: false,
      },
    },
  ],
};
