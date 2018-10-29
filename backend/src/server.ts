import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import socketIo from 'socket.io';
import { apiRouter } from './routes/api';
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
    this.app.use('/api', apiRouter);

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
