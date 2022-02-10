module.exports = ({ env }) => ({
  email: {
    provider: "nodemailer-v3",
    providerOptions: {},
    settings: {
      host: "smtp.gmail.com",
      port: 465,
      username: "tf961.dev@gmail.com",
      password: env("SMTP_SERVER_PASSWORD", ""),
      secure: true,
    },
  },
});
