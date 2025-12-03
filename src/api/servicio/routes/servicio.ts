export default {
  routes: [
    {
      method: "GET",
      path: "/servicios",
      handler: "servicio.findAll",
      config: {
        auth: false,
      },
    },
  ],
};
