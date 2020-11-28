const express = require('express')
const { ExpressPeerServer } = require('peer');

const PORT = process.env.PORT || 9000;

const app = express();
const server = require('http').createServer(app);

const peerServer = ExpressPeerServer(server, {
    debug: true,
});

app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => {
    console.log("connection made: ", client);
});

peerServer.on('disconnect', (client) => {
    console.log("disconnected: ", client);
});


server.listen(PORT, () => {
    console.log("Peer Server Connected to port: " + PORT);
});
