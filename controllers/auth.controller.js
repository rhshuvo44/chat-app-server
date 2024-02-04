const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const generateToken = require("../uttils/generateToken");
const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    //HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfile : girlProfile,
    });
    //jwt
    generateToken(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error is Signup controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPassword = await bcrypt.compare(password, user?.password || "");

    if (!user && !isPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    //jwt
    generateToken(user._id, res);

    res.status(201).json({
      fullName: user?.fullName,
      username: user?.username,
      profilePic: user?.profilePic,
    });
  } catch (error) {
    console.log("Error is login controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};
const logout = (req, res) => {
  try {
    re.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error is logout controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};

module.exports = { signup, login, logout };
