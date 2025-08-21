const MessageCollection = require("../../models/message");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const ConversationServ = async (userId) => {
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
   
    return conversations;
}

module.exports = {
 ConversationServ,
};
  