const express = require('express');

const postsRouter = require('./posts-router');

const server = express();

server.use(express.json());

server.use(postsRouter) 

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

module.exports = server;