const sendMessage = async (req, res) => {
  try {
    re.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error is logout controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};
module.exports = {
  sendMessage,
};
