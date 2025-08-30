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

const markMessagesAsReadController = async (req, res) => {
  try {
    const { id } = req.query;
    const userId = ObjectId.createFromHexString(id);
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    // Update all matching messages
    const result = await MessageCollection.updateMany(
      {
        to: userId,
        status: { $in: ['sent', 'delivered'] },
      },
      {
        $set: { status: 'seen' },
      }
    );

    return res.status(200).json({
      success: true,
      modifiedCount: result.modifiedCount,
      message: 'Messages marked as read successfully',
    });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get count of sent/delivered messages for a user
const getPendingMessageCountCtrl = async (req, res) => {
  try {
    const { id } = req.query;
    const userId = ObjectId.createFromHexString(id);
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    // Count messages
    const count = await MessageCollection.countDocuments({
      to: userId,
      status: { $in: ['sent', 'delivered'] },
    });

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error('Error fetching pending message count:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
 messageAddController,
 getMessagesContoller,
 getConversationListCotroller,
 markMessagesAsReadController,
 getPendingMessageCountCtrl
};
  