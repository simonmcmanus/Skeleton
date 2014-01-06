
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , bunyan = require('bunyan')
  , CONFIG = require('config');

var log = bunyan.createLogger({name: 'skeleton-app'});
var app = express();


app.configure('development', function(){
  app.use(require('express-chrome-logger'));
  app.use(express.errorHandler());
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', routes.index);

app.get('/logging', function(req, res) {
  console.log(CONFIG.domain);
  res.console.log('Send to chrome logger', CONFIG); // Wil only work in development.
  log.info('hi');
  log.warn('Just a warning.');
  log.error('Something went terribly wrong. :(');
  res.send('A response.');
});

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  log.info('Express server listening on port ' + app.get('port'));
});
