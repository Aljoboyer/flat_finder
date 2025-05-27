const UserCollection = require("../../../models/user");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// get A User
const getSpecificUser = async (req, res) => {
  try {
 
    const { id } = req.query

     const User = await UserCollection.findById({_id: new ObjectId(id)})

    res.status(200).json({
      data: User
    });
  } catch (error) {

    res.status(500).json({ message: "User fetching failed", error });
  }
};

module.exports = {
  getSpecificUser
};
  