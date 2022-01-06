const Message = require("../models/Message");
const messageController = {
  createMessage: async (req, res) => {
    const newMsg = new Message(req.body);
    try {
      const savedMsg = await newMsg.save();
      res.status(200).json(savedMsg);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getMessage: async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = messageController;
