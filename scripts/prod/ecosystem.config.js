module.exports = {
  apps: [
    {
      name: "tf961-cms",
      script: "./server.js",
      exp_backoff_restart_delay: 100,
      time: true,
      env: {
        "NODE_ENV": "production",
        "ENV_PATH": ".env.prod"
      }
    }
  ]
}
