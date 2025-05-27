const { generateFilterQuery } = require("../../../helper/generateFilterQuery");
const { PaginationCalculate } = require("../../../helper/pagination");
const PropertyCollection = require("../../../models/property");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//Posting Property
const propertyPostController = async (req, res) => {
  
    const requestData = req.body;

    try {

      const result = await PropertyCollection.create(requestData);


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
    const  result = await PropertyCollection.find(query).skip(skip).limit(Number(limit));
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

     const Property = await PropertyCollection.findById({_id: new ObjectId(id)}).populate({
        path: 'comments',
        populate: {
          path: 'commenter', 
          select: 'name email image' 
        }
      });

    res.status(200).json({
      data: Property
    });
  } catch (error) {

    res.status(500).json({ message: "Property fetching failed", error });
  }
};

//Adding Like on A Property
const addLikeOnPropertyontroller = async (req, res) => {
  
    const {liker_id, property_id} = req.body;

    try {
      
         await PropertyCollection.findByIdAndUpdate(
            property_id,
            { $push: { likes: liker_id } },
            { new: true }
          );

          
      res.status(201).json({ "msg": "Like Added Successfully" });

    } catch (error) {
      res.status(500).json({ message: "Like Posting Failed" , error});
    }
};

module.exports = {
  propertyPostController,
  getAllPropertyController,
  updatePropertyController,
  getSpecificProperty,
  addLikeOnPropertyontroller
};
  