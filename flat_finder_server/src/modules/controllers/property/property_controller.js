const { PaginationCalculate } = require("../../../helper/pagination");
const PropertyCollection = require("../../../models/property");

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


//Get all Property
const getAllPropertyController = async (req, res) => {

    try {
      const paginationOption = {
        page: req?.query?.page,
        limit: req?.query?.limit,
      };

      const {page, limit, skip} = PaginationCalculate(paginationOption);

      const result = await PropertyCollection.find({}).skip(skip).limit(limit);
      const totalCount = await PropertyCollection.find({}).countDocuments();

      res.status(201).json({data: result, page, limit, totalPage: totalCount});

    } catch (error) {
      res.status(500).json({ message: "Property Posting Failed" , error});
      console.log(error);
    }
  };


  module.exports = {
    propertyPostController,
    getAllPropertyController
  };
  