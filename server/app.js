var express = require('express');
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');

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

app.get('/', function(req, res){
  res.sendFile('index.html', options, function(err){
    if (err) {
      console.log(err, options)
    } 
  })
})
