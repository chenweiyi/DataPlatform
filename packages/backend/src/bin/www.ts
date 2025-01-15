#!/usr/bin/env node
import 'dotenv/config';
import debugLibrary from 'debug';
import http from 'http';

// import '../utils/abortControllerPolyfill';
// import '../utils/fetchPolyfill';
import app from '../app';
import {
  clearZombieCron,
  restoreData,
  clearEmailVerifyCode,
} from '../utils/initHelper';

const debug = debugLibrary('crawler');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.SERVER_PORT || '3000');
// app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  debug('Listening on ' + bind);

  restoreData();
  clearZombieCron();
  clearEmailVerifyCode();
}
