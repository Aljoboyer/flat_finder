const MessageCollection = require("../../../models/message");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const messageAddController = async (req, res) => {

    try {
      const addedMsg = await MessageCollection.create(req.body);
      
      res.status(201).json({ "msg": "Msg Sent" });

    } catch (error) {
      console.log('error ===>', error)
      res.status(500).json({ "msg": "Msg Sent Failed" });
    }
  };

module.exports = {
 messageAddController
};
  