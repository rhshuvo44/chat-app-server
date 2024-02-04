const express = require("express");
const { signup, login, logout } = require("../controllers/auth.controller");

const route = express.Router();
route.post("/signup", signup);
route.post("/login", login);
route.get("/logout", logout);
module.exports = route;
