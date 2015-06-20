var express = require('express');
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');
// Added config.js to gitignore  - has quandl api key and sets process.env.NODE_ENV = 'development';
var config = require('./config.js');
var path = require('path')
var url = require('url')

server.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

exports = module.exports = app;

var options = {
  root: __dirname + '/../client/',
  dotfiles: 'deny',
  headers: {
    'x-timestamp' : Date.now(),
    'x-sent' : true
  }
}


app.use(express.static("client"));


app.get('/node_modules/*', function(req, res){
  var options = {
    root: __dirname + '/../',
    dotfiles: 'deny',
    headers: {
      'x-timestamp' : Date.now(),
      'x-sent' : true
    }
  }
  options.root = options.root + path.parse(req.url).dir
  res.sendFile(path.parse(req.url).base, options, function(err){
      if (err) {
        console.log(err, options)
      } 
    })
})


app.get('/', function(req, res){
  res.sendFile('index.html', options, function(err){
    if (err) {
      console.log(err, options)
    } 
  })
})

var Quandl = require('quandl')
var quandl = new Quandl({
    auth_token: '',
    api_version: 1,
});


app.get('/testdata', function(req, res){
  console.log('url: ', req.url)
  console.log('body: ', req.body)
  // See https://www.quandl.com/help/api#A-Simple-Example
  // AND https://www.quandl.com/help/api
  var code = {
    'source': "WIKI",
    'table': "AAPL"
  }
  var options = { 
    column:"4",
    sort_order:"asc",
    collapse:"quarterly",
    trim_start:"2012-01-01",
    trim_end:"2013-12-31"
  }
  quandl.dataset(code, options, function(err, response){
      if(err){
        console.log('ENDPOINT: /testdata : ERROR',err);
      }
      res.end(response)
  });
})