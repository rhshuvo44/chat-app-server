const express = require("express");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route");
const connectToMongoDB = require("./db/connectToMongoDB");
const messageRoute = require("./routes/message.route");
const userRoute = require("./routes/user.route");
const { app, server } = require("./socket/socket");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/users", userRoute);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
