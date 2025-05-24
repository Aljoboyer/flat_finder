const { generateFilterQuery } = require("../../../helper/generateFilterQuery");
const { PaginationCalculate } = require("../../../helper/pagination");
const PropertyCollection = require("../../../models/property");
const { ObjectId } = require('mongodb');

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


  module.exports = {
    propertyPostController,
    getAllPropertyController
  };
  