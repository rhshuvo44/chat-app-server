const express = require("express");
const cookieParser = require("cookie-parse");
const authRoute = require("./routes/auth.route");
const connectToMongoDB = require("./db/connectToMongoDB");
const messageRoute = require("./routes/message.route");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", authRoute);
app.use("/api/message/", messageRoute);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
