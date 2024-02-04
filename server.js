const express = require("express");
const authRoute = require("./routes/auth.route");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth/", authRoute);

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
