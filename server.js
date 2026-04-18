const { PeerServer } = require('peer');
const express = require('express');

const app = express();

// CORS for any origin (needed for browser connections)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.get('/', (req, res) => res.send('ECG PeerJS Signaling Server — OK'));

const port = process.env.PORT || 9000;

const peerServer = PeerServer({
  port: port,
  path: '/peerjs',
  allow_discovery: false,
  corsOptions: { origin: '*' }
});

peerServer.on('connection', (client) => {
  console.log('Client connected:', client.getId());
});
peerServer.on('disconnect', (client) => {
  console.log('Client disconnected:', client.getId());
});

console.log(`PeerJS signaling server running on port ${port}`);
