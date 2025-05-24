const CommentCollection = require("../../../models/comment");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Property = require("../../../models/property");

//Posting Comment
const CommentPostController = async (req, res) => {
  
    const requestData = req.body;

    try {

      const newComment = await CommentCollection.create(requestData);

         await Property.findByIdAndUpdate(
            requestData.property,
            { $push: { comments: newComment._id } },
            { new: true }
          );

          
      res.status(201).json({ "msg": "Comment posted Successfully" });

    } catch (error) {
      res.status(500).json({ message: "Comment Posting Failed" , error});
    }
  };

module.exports = {
 CommentPostController
};
  