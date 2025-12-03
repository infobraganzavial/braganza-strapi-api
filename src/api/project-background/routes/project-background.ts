export default {
  routes: [
    {
      method: "GET",
      path: "/project-background",
      handler: "project-background.find",
      config: {
        auth: false,
      },
    },
  ],
};
