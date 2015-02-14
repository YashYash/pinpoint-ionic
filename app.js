'use strict';
var http = require('http');
var express = require('express'),
    app = express();

app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});


// API Routes
// app.get('/blah', routeHandler);

app.set('port', process.env.PORT || 5000);

var server = http.createServer(app);

var io = require('socket.io').listen(server, {
  log: true
});

var socket = io.sockets.on('connection', function(socket) {
  console.log('#### Socket.io Connected. Port ' + app.get('port'));
  return socket;
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));

});
