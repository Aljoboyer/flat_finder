const UserCollection = require("../../../models/user");
const PropertyCollection = require("../../../models/property");
const ConnectionCollection = require("../../../models/connection");
const PropertySavedCollection = require("../../../models/savedProperty");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcryptjs");
const { generateFilterQuery } = require("../../../helper/generateFilterQuery");
const { PaginationCalculate } = require("../../../helper/pagination");

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


// Updating user Account password
const changePasswordController = async (req, res) => {
  try {
 
    const { _id, password, newPassword, oldPassword} = req.body

    const isPasswordCorrect = await bcrypt.compare(oldPassword, password);
    if(!isPasswordCorrect){
        res.status(200).json({
          msg: "Your current password is incorrect."
        });
    }
    else{
      const hashedPassword = await bcrypt.hash(newPassword, 12);
       const updatedProperty = await UserCollection.findByIdAndUpdate(
        _id,
        {password: hashedPassword},
        { new: true } 
      );
        res.status(200).json({
          msg: "updated successfully",
          newPassword: hashedPassword
        });
    }
   
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

    res.status(200).json({
      data: detailsData
    });
  } catch (error) {

    res.status(500).json({ message: "Seller Details fetching failed", error });
  }
};

//getting buyer saved property
const getSavedPropertiesController = async (req, res) => {
    
    const query = generateFilterQuery(req.query)
    const { skip , page, limit} = PaginationCalculate(req.query);

    try {
        const  result = await PropertySavedCollection.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate([
          {
          path: 'property', 
          select: 'title propertyId price city areaName advanceMoney images bedRooms flatMeasurement propertyType'
          },
          {
          path: 'seller',
          select: 'name address propertyName image _id'
          }
      ]);
      
      const  totalCount = await PropertySavedCollection.countDocuments(query);
  
      res.status(200).json({
        data: result,
        page: Number(page),
        limit: Number(limit),
        totalPage: Math.ceil(totalCount / limit),
        totalData: totalCount
      });

    } catch (error) {
      res.status(500).json({ message: "Connection get Failed" , error});
      
    }
  };

module.exports = {
  getSpecificUser,
  updateProfileController,
  sellerDetailsController,
  changePasswordController,
  getSavedPropertiesController
};
  