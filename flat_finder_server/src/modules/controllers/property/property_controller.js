const { generateFilterQuery } = require("../../../helper/generateFilterQuery");
const { generatePropertyId } = require("../../../helper/generatePropertyId");
const { PaginationCalculate } = require("../../../helper/pagination");
const PropertyCollection = require("../../../models/property");
const PropertySavedCollection = require("../../../models/savedProperty");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//Posting Property
const propertyPostController = async (req, res) => {
  
    const requestData = req.body;

    try {
      const propertyId = generatePropertyId()
      const result = await PropertyCollection.create({...requestData, propertyId});


    res.status(201).json({ "msg": "Poperty posted Successfully" });

    } catch (error) {
      res.status(500).json({ message: "Property Posting Failed" , error});
      console.log(error);
    }
  };


// Get all Properties with Pagination + Filters
const getAllPropertyController = async (req, res) => {
  try {

    const { skip , page, limit} = PaginationCalculate(req.query);
    const query = generateFilterQuery(req.query)

    // Fetch filtered data with pagination
    const  result = await PropertyCollection.find(query).select('-comments -likes -video -googleMapUrl -description').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate({
    path: 'seller',
    select: 'name propertyName image _id'
  });;

    const  totalCount = await PropertyCollection.countDocuments(query);

    res.status(200).json({
      data: result,
      page: Number(page),
      limit: Number(limit),
      totalPage: Math.ceil(totalCount / limit),
      totalData: totalCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Property Fetching Failed", error });
  }
};

// Updating Property
const updatePropertyController = async (req, res) => {
  try {
 
    const { _id, ...rest} = req.body

     const updatedProperty = await PropertyCollection.findByIdAndUpdate(
      {_id: new ObjectId(_id)},
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

// get A Property
const getSpecificProperty = async (req, res) => {
  try {
 
    const { id } = req.query
    const Property = await PropertyCollection.findById({_id: new ObjectId(id)}).populate([
                {
                path: 'comments',
                select: 'name email image'
                },
                {
                path: 'seller',
                select: '_id name phone propertyName image address'
                }
            ]);

    res.status(200).json({
      data: Property
    });
  } catch (error) {

    res.status(500).json({ message: "Property fetching failed", error });
  }
};

//Saving Property
const propertySavedController = async (req, res) => {
  
    const requestData = req.body;

    try {

      const result = await PropertySavedCollection.create(requestData);

      res.status(201).json({ "msg": "Property Saved Successfully" });

    } catch (error) {
      res.status(500).json({ message: "Propert Saved Failed" , error});
      
    }
  };


module.exports = {
  propertyPostController,
  getAllPropertyController,
  updatePropertyController,
  getSpecificProperty,
  propertySavedController
};
  