const express = require("express");
const { sendMessage } = require("../controllers/message.controller");
const protectRoute = require("../middleware/protectRoute");

const route = express.Router();
route.post("/send/:id", protectRoute, sendMessage);
route.post("/login");
route.post("/logout");
module.exports = route;
