const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connect ", socket.id);
  socket.on("disconnect", () => {
    console.log(" user disconnect ", socket.id);
  });
});

module.exports = {
  app,
  io,
  server,
};
