var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var ejs = require('ejs');
var expressLayouts = require('express-ejs-layouts');
var apiRouter = express.Router();
var config = require('./config/config');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();



// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/todolist');
// app.set(path.join(__dirname, './app/views/'));
app.use(express.static(__dirname + '/public'));
// app.set('views', path.join(__dirname, './app/views'));
// app.set('view engine', 'ejs');
// app.set('layout', 'myLayout');

// Configure app to handle CORS requests
// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//   next();
// });


// var itemController = require('./app/controllers/item');
// app.use(expressLayouts);
// var routes = require('./app/routes');
// routes(app);

require('./public/js/routes')(app);

app.get('*', function(req, res) {
      res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(config.port);
module.exports = app;