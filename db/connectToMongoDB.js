const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch {
    console.log("Error connecting to MongoDB", error.message);
  }
};

module.exports = connectToMongoDB;
