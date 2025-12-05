export default {
  routes: [
    {
      method: "GET",
      path: "/clients",
      handler: "client.findAll",
      config: {
        auth: false,
      },
    },
  ],
};
