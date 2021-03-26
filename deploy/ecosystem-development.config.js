module.exports = {
  apps : [{
    name: 'EXPRESS-HUB-DEV',
    script: 'bin/www',
    watch: false,
    max_memory_restart: '1G',
    instances: 1,
    instance_var: "INSTANCE_ID",
    exec_mode: "cluster",
    out_file: "~/.pm2/logs/express-dev-hub-out.log",
    error_file: "~/.pm2/logs/express-dev-hub-error.log",
    env: {
      NODE_ENV: 'development',
      PORT: 4000,

      REDIS_HOST: process.env.DEV_REDIS_HOST,
      REDIS_PORT: process.env.DEV_REDIS_PORT,
      REDIS_PREFIX: process.env.DEV_EXPRESS_REDIS_PREFIX,

      SESSION_SECRET: process.env.DEV_SESSION_SECRET,
      SESSION_COOKIE_NAME: process.env.DEV_EXPRESS_SESSION_COOKIE_NAME,

      COOKIE_DOMAIN: process.env.DEV_EXPRESS_COOKIE_DOMAIN,
    }
  }],
  deploy : {
    development : {
      user : 'ubuntu',
      host : '103.9.126.61',
      ref  : 'origin/development',
      repo : 'git@gitlab.com:EtobeeTechDevelopment/Express/HubApplication.git',
      path : '/home/ubuntu/products/express/development/hub',
      "pre-deploy": "rm -f .env",
      "post-deploy" : "source ~/ERPVariables/development/variables.sh && cp ~/ERPVariables/development/.env ./ && npm install && npm run build && pm2 startOrReload deploy/ecosystem-development.config.js --update-env"
    }
  }
};
