//Connect to database
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://' + (process.env.MONGO_HOST || 'localhost') + '/projectBetrayal', { useNewUrlParser: true, useCreateIndex: true });

//Create the express app
const express = require('express');
const app = express();

// Store Epress port
const port = process.env.PORT || 3000;
app.set('port', port);

// POST data parsers
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cross origin middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Point static path to dist
const path = require('path');
app.use(express.static(path.join(__dirname, 'dist')));

//Setup API routes
const api = require('./server/routes/api');
app.use('/api', api);

// All other routes go to the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

//Create HTTP server
const http = require('http');
const server = http.createServer(app);

//Create the socket.io handler
const io = require('socket.io').listen(server)
io.sockets.on("connect", () => { });

//Listen on provided port, on all interfaces
server.listen(port, () => console.log('Server and API are running on localhost:' + port));
