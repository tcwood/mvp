var express = require('express');

var app = express();

// app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
  // console.log(__dirname);
  res.sendFile(__dirname + '/client/index.html')
})

app.listen('3000', function() {
  console.log('server listening on port 3000');
})

module.exports = app;