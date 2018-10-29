import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import socketIo from 'socket.io';
import { createServer, Server } from 'http';

export class BetrayalServer {
    private app: express.Application;
    private server: Server;
    private io: socketIo.Server;
    private port: string | number;
    private db: Promise<mongoose.Mongoose>;
    private db_host: string;

    constructor(port: number = 3000, mongo_host: string = 'localhost') {
        // Store contstructor paramters
        this.port = port;
        this.db_host = mongo_host;

        // Initialize database connection
        this.db = mongoose.connect('mongodb://' + this.db_host + '/projectBetrayal', { useNewUrlParser: true });

        // Create the Express app
        this.app = express();

        // Set the port for Express
        this.app.set('port', this.port);

        // POST data parsers
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Cross origin middleware
        this.app.use((_req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        // Setup API routes
        this.app.use('/api', api);

        // All other routes get a standard response
        this.app.get('*', (_req, res) => {
            res.send('Nothing to see here');
        });

        // Create HTTP server
        this.server = createServer(this.app);

        // Create the Socket.IO instance
        this.io = socketIo.listen(this.server)
        this.io.sockets.on("connect", () => { }); //TODO

        // Start listening on the port provided
        this.server.listen(this.port, () => console.log('Now serving API on localhost:' + this.port));
    }
}

/*
//Connect to database
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://' + (process.env.MONGO_HOST || 'localhost') + '/projectBetrayal', { useNewUrlParser: true, useCreateIndex: true });

//Create the express app
const express = require('express');
const app = express();

// Store Express port
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
*/
