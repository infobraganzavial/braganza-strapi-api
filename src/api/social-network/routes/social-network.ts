export default {
  routes: [
    {
      method: "GET",
      path: "/social-networks",
      handler: "social-network.find",
      config: {
        auth: false,
      },
    },
  ],
};
