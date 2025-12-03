/**
 * carousel router
 */
export default {
  routes: [
    {
      method: "GET",
      path: "/carousels",
      handler: "carousel.findAll",
      config: {
        auth: false,
      },
    },
  ],
};
