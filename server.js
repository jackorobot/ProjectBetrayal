// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Get API routes
const api = require('./server/routes/api');

//Connect to database
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/projectBetrayal', { useMongoClient: true });

const app = express();

// POST data parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//Setup our api routes
app.use('/api', api);

// All other routes go to the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

// Store Epress port
const port = process.env.PORT || 3000;
app.set('port', port);

//Create HTTP server
const server = http.createServer(app);

//Listen on provided port, on all interfaces
server.listen(port, () => console.log('Server and API are running on localhost:' + port));