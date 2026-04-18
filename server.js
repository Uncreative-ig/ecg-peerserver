const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

// Basic CORS (allows browser connections)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Health check route
app.get('/', (req, res) => {
  res.send('ECG PeerJS Signaling Server — OK');
});

// Railway provides PORT automatically
const port = process.env.PORT || 9000;

// Start Express server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Attach PeerJS server to Express
const peerServer = ExpressPeerServer(server, {
  path: '/',
  corsOptions: {
    origin: '*'
  }
});

app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => {
  console.log('Client connected:', client.getId());
});

peerServer.on('disconnect', (client) => {
  console.log('Client disconnected:', client.getId());
});
