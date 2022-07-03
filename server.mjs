import pty from "node-pty";
import { createWebSocketStream, WebSocketServer } from "ws";

import path from "path";
import cors from 'cors';

// ###############
// Creating Server
// ###############
import http from "http";

import express from "express";
var app = express();

const server = http.createServer(app);
server.listen(3000, () => {
  console.log("listening on port 3000");
});

// ######
// SOCKET
// ######
const wss = new WebSocketServer({ server, path: "/socket" });

wss.on("connection", (ws) => {
  console.log("new connection");

  const duplex = createWebSocketStream(ws, { encoding: "utf8" });

  const proc = pty.spawn("sh", [], { name: "xterm-color" });

  const onData = proc.onData((data) => duplex.write(data));

  const exit = proc.onExit(() => {
    console.log("process exited");
    onData.dispose();
    exit.dispose();
  });

  duplex.on("data", (data) => proc.write(data.toString()));

  ws.on("close", function () {
    console.log("stream closed");
    proc.kill();
    duplex.destroy();
  });
});

// ###########
// Serve index
// ###########
const __dirname = path.resolve();

app.use(express.static(__dirname + '/'));
app.use(cors())

app.get("/", (req, res) => {
  const __dirname = path.resolve();

  res.sendFile(path.join(__dirname, "/index.html"));
});
