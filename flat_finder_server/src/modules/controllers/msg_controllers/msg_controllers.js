const MessageCollection = require("../../../models/message");
const mongoose = require('mongoose');
const { ConversationServ } = require("../../../services/messageServ/ConversationServ");
const ObjectId = mongoose.Types.ObjectId;

const messageAddController = async (req, res) => {

    try {
      const addedMsg = await MessageCollection.create(req.body);
      
      res.status(201).json({ "msg": "Msg Sent" });

    } catch (error) {
      res.status(500).json({ "msg": "Msg Sent Failed" });
    }
};

const getMessagesContoller = async (req, res) => {

    const {limit, currentUser, selectedUser} = req.query

    try {
      const messages = await MessageCollection.find({
          $or: [
            { from: currentUser, to: selectedUser },
            { from: selectedUser, to: currentUser }
          ]
        })
        .sort({ createdAt: 1 }).limit(limit);
      
      res.status(201).json({ messages});

    } catch (error) {
      res.status(500).json({ "msg": "Msg Sent Failed" });
    }
    
}

const getConversationListCotroller = async (req, res) => {
  const {userId} = req.query

  try {
      
      const conversations = await ConversationServ(userId)

      res.status(201).json({ conversations});

  } catch (error) {
      res.status(500).json({ "msg": "Conversation Get Failed" });
  }
}
module.exports = {
 messageAddController,
 getMessagesContoller,
 getConversationListCotroller
};
  