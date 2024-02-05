const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const { getUsersForSidebar } = require("../controllers/user.controller");

const route = express.Router();

route.post("/send/:id", protectRoute);
route.get("/", getUsersForSidebar);

module.exports = route;
