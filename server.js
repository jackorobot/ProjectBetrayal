var gameport = process.env.PORT || 80;

var Express = require('express');
var app = Express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var BetrayalGame = require('./includes/betrayalGame');

var betrayalGame = new BetrayalGame();

//setting up express erver
app.get('/', function(req, res){
  res.sendFile(__dirname + '/default.html');
});

io.on('connection', function(client){
  console.log('User connected');
});

server.listen(gameport);
console.log('Express listening on port ' + gameport);