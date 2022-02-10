module.exports = {
  apps: [
    {
      name: "tf961-cms",
      script: "./server.js",
      time: true,
      env: {
        "NODE_ENV": "uat",
        "ENV_PATH": ".env.uat"
      }
    }
  ]
}
