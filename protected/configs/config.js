module.exports = {
  session: {
    name: process.env.SESSION_COOKIE_NAME,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      prefix: process.env.REDIS_PREFIX,
    }
  },
  cookie: {
    path     : '/',
    domain   : process.env.COOKIE_DOMAIN,
    httpOnly : true,
    maxAge   : 1000*60*60*24
  }
};
