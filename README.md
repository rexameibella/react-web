Requirements
-----------

This API requires:

* NVM (NodeJS >= 10.16.0)
* NPM (Version ~6.9.0)
* PM2 (Latest Version)
* Nginx
* Redis Server

# Setup

Install dependencies:

`npm install`

# Running the app

Run project with this command (__Server Mode__):

``
npm run build
``

then

``
pm2 start ecosystem.config.js
``

Run project with this command (__Frontend Development Mode__):

``
npm run start-dev-frontend
``