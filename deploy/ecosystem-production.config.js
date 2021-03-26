module.exports = {
  apps : [{
    name: 'EXPRESS-HUB-PROD',
    script: 'bin/www',
    watch: false,
    max_memory_restart: '1G',
    instances: 1,
    instance_var: "INSTANCE_ID",
    exec_mode: "cluster",
    out_file: "~/.pm2/logs/express-prod-hub-out.log",
    error_file: "~/.pm2/logs/express-prod-hub-error.log",
    env: {
      NODE_ENV: 'production',
      PORT: 5076,

      REDIS_HOST: process.env.PROD_REDIS_HOST,
      REDIS_PORT: process.env.PROD_REDIS_PORT,
      REDIS_PREFIX: process.env.PROD_EXPRESS_REDIS_PREFIX,

      SESSION_SECRET: process.env.PROD_SESSION_SECRET,
      SESSION_COOKIE_NAME: process.env.PROD_EXPRESS_SESSION_COOKIE_NAME,

      COOKIE_DOMAIN: process.env.PROD_EXPRESS_COOKIE_DOMAIN,
    }
  }],
  deploy : {
    production : {
      user : 'ubuntu',
      host : [{
        host: '10.10.10.53',
        port: '22'
      }],
      ref  : 'origin/master',
      repo : 'git@gitlab.com:EtobeeTechDevelopment/Express/HubApplication.git',
      path : '/home/ubuntu/products/express/production/hub',
      "pre-deploy": "rm -f .env",
      "post-deploy" : "source ~/ERPVariables/production/variables.sh && cp ~/ERPVariables/production/.env ./ && npm install && npm run build && pm2 startOrReload deploy/ecosystem-production.config.js --update-env"
    }
  }
};
