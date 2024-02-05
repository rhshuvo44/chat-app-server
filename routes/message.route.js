const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller");
const protectRoute = require("../middleware/protectRoute");

const route = express.Router();
route.post("/send/:id", protectRoute, sendMessage);
route.get("/:id", protectRoute, getMessages);

module.exports = route;
