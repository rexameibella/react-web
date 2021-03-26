module.exports = {
  apps : [{
    name: 'EXPRESS-HUB-LOCAL',
    script: 'bin/www',
    watch: true,
    max_memory_restart: '1G',
    instances: 1,
    instance_var: "INSTANCE_ID",
    exec_mode: "cluster",
    out_file: "~/.pm2/logs/express-local-hub-out.log",
    error_file: "~/.pm2/logs/express-local-hub-error.log",
    env: {
      NODE_ENV: 'local',
      PORT: 4000,

      REDIS_HOST: process.env.LOCAL_REDIS_HOST,
      REDIS_PORT: process.env.LOCAL_REDIS_PORT,
      REDIS_PREFIX: process.env.LOCAL_EXPRESS_REDIS_PREFIX,

      SESSION_SECRET: process.env.LOCAL_SESSION_SECRET,
      SESSION_COOKIE_NAME: process.env.LOCAL_EXPRESS_SESSION_COOKIE_NAME,

      COOKIE_DOMAIN: process.env.LOCAL_EXPRESS_COOKIE_DOMAIN,
    }
  }]
};
