export default {
  routes: [
    {
      method: "GET",
      path: "/projects",
      handler: "project.find",
      config: {
        auth: false,
      },
    },
  ],
};
