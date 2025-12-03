/**
 * contact-bar-social-network router
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/contact-bar-social-network",
      handler: "contact-bar-social-network.findAll",
      config: {
        auth: false,
      },
    },
  ],
};
