const MessageCollection = require("../../../models/message");
const mongoose = require('mongoose');
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
  console.log('hitted', userId)
  try {
          const currentUserId = ObjectId.createFromHexString(userId);

          const conversations = await MessageCollection.aggregate([
            {
              $match: {
                $or: [
                  { from: currentUserId },
                  { to: currentUserId }
                ]
              }
            },
            {
              $addFields: {
                conversationId: {
                  $cond: [
                    { $lt: ["$from", "$to"] },
                    { $concat: [{ $toString: "$from" }, "_", { $toString: "$to" }] },
                    { $concat: [{ $toString: "$to" }, "_", { $toString: "$from" }] }
                  ]
                }
              }
            },
            { $sort: { createdAt: -1 } },
            {
              $group: {
                _id: "$conversationId",
                latestMessage: { $first: "$$ROOT" }
              }
            },
            // lookup users
            {
              $lookup: {
                from: "users",
                localField: "latestMessage.from",
                foreignField: "_id",
                as: "fromUser"
              }
            },
            {
              $lookup: {
                from: "users",
                localField: "latestMessage.to",
                foreignField: "_id",
                as: "toUser"
              }
            },
            {
              $addFields: {
                fromUser: { $arrayElemAt: ["$fromUser", 0] },
                toUser: { $arrayElemAt: ["$toUser", 0] }
              }
            },
            {
              $addFields: {
                otherUser: {
                  $cond: [
                    { $eq: ["$latestMessage.from", currentUserId] }, // now comparing ObjectId vs ObjectId
                    "$toUser",
                    "$fromUser"
                  ]
                }
              }
            },
            {
              $project: {
                _id: 1,
                "latestMessage._id": 1,
                "latestMessage.content": 1,
                "latestMessage.messageType": 1,
                "latestMessage.createdAt": 1,
                "otherUser._id": 1,
                "otherUser.name": 1,
                "otherUser.image": 1
              }
            },
            { $sort: { "latestMessage.createdAt": -1 } }
          ]);

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
  