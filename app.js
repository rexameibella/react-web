const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const favicon = require('serve-favicon');

const app = express();

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'protected/views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// app.use(require("./protected/middlewares/SetupMiddleware"));
// app.use(require("./protected/middlewares/AllowMethodMiddleware"));

app.get('/*', function(req,res){
	res.render('index');
});

app.use(require("./protected/middlewares/basic/404Middleware"));
app.use(require("./protected/middlewares/basic/ErrorMiddleware"));

module.exports = app;
