export default {
  routes: [
    {
      method: "GET",
      path: "/about-uses",
      handler: "about-us.find",
      config: {
        auth: false,
      },
    },
  ],
};
