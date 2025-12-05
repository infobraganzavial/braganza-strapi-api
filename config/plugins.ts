export default ({ env }) => ({
  //Cloudinary
  upload: {
    config: {
      provider: "@strapi/provider-upload-cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
        secure: true,
      },
      actionOptions: {
        upload: {
          folder: "Braganza",
          resource_type: "image",
        },
        delete: {},
      },
      breakpoints: {
        large: 1000,
        medium: 750,
        small: 500,
        thumbnail: 245,
      },
      baseUrl: "https://res.cloudinary.com/dc2jukw2z/image/upload/",
    },
  },

  // SendGrid
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: env("SENDGRID_FROM"),
        defaultReplyTo: env("CONTACT_INBOX"),
      },
    },
  },
});
