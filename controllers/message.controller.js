const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, id] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: { $all: [senderId, id] },
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId: id,
      message,
    });
    if (newMessage) {
      conversation.message.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error is logout controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};
const getMessages = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, id] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: { $all: [senderId, id] },
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId: id,
      message,
    });
    if (newMessage) {
      conversation.message.push(newMessage._id);
    }
    // await conversation.save();
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error is logout controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};
module.exports = {
  sendMessage,
  getMessages,
};
