module.exports = {
  apps : [{
    name: 'EXPRESS-HUB-STAGING',
    script: 'bin/www',
    watch: false,
    max_memory_restart: '1G',
    instances: 1,
    instance_var: "INSTANCE_ID",
    exec_mode: "cluster",
    out_file: "~/.pm2/logs/express-staging-hub-out.log",
    error_file: "~/.pm2/logs/express-staging-hub-error.log",
    env: {
      NODE_ENV: 'staging',
      PORT: 4076,

      REDIS_HOST: process.env.STAGING_REDIS_HOST,
      REDIS_PORT: process.env.STAGING_REDIS_PORT,
      REDIS_PREFIX: process.env.STAGING_EXPRESS_REDIS_PREFIX,

      SESSION_SECRET: process.env.STAGING_SESSION_SECRET,
      SESSION_COOKIE_NAME: process.env.STAGING_EXPRESS_SESSION_COOKIE_NAME,

      COOKIE_DOMAIN: process.env.STAGING_EXPRESS_COOKIE_DOMAIN,
    }
  }],
  deploy : {
    staging : {
      user : 'ubuntu',
      host : '103.9.126.61',
      ref  : 'origin/staging',
      repo : 'git@gitlab.com:EtobeeTechDevelopment/Express/HubApplication.git',
      path : '/home/ubuntu/products/express/staging/hub',
      "pre-deploy": "rm -f .env",
      "post-deploy" : "source ~/ERPVariables/staging/variables.sh && cp ~/ERPVariables/staging/.env ./ && npm install && npm run build && pm2 startOrReload deploy/ecosystem-staging.config.js --update-env"
    }
  }
};
