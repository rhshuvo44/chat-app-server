const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const User = require("../models/user.model");

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req?.user?._id;
    console.log(req);
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error is logout controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};

module.exports = {
  getUsersForSidebar,
};
