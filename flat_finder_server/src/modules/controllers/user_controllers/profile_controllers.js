const UserCollection = require("../../../models/user");
const PropertyCollection = require("../../../models/property");
const ReviewCollection = require("../../../models/review");
const ConnectionCollection = require("../../../models/connection");
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

// Updating user Profile
const updateProfileController = async (req, res) => {
  try {
 
    const { _id, ...rest} = req.body

     const updatedProperty = await UserCollection.findByIdAndUpdate(
      _id,
      rest,
      { new: true } 
    );

    res.status(200).json({
      msg: "updated successfully"
    });
  } catch (error) {

    res.status(500).json({ message: "Update Failed", error });
  }
};

//Seller review , property data
const sellerDetailsController = async (req, res) => {
  try {
 
    const { property, seller_id ,followers} = req.query;
    let detailsData = []
    if(property){
       detailsData = await PropertyCollection.find({seller: seller_id})
    }
    else if(followers){
        detailsData = await ConnectionCollection.find({seller: seller_id}).populate({
        path: 'buyer',
        select: 'name email image' 
      });
    }
    else{
     detailsData = await ReviewCollection.find({seller: seller_id})
    }

    res.status(200).json({
      data: detailsData
    });
  } catch (error) {

    res.status(500).json({ message: "Seller Details fetching failed", error });
  }
};

module.exports = {
  getSpecificUser,
  updateProfileController,
  sellerDetailsController
};
  