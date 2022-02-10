module.exports = {
  apps: [
    {
      name: "tf961-cms",
      script: "./server.js",
      env: {
        "NODE_ENV": "development",
        "ENV_PATH": ".env"
      }
    }
  ]
}
