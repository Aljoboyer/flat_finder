const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const RentRequestCollection = require("../../../models/rentRequest");
const PropertyCollection = require("../../../models/property");
const { PaginationCalculate } = require('../../../helper/pagination');
const { generateFilterQuery } = require('../../../helper/generateFilterQuery');

//Requesting For Rent
const RentRequestController = async (req, res) => {
  
    const requestData = req.body;

    try {
    const rentRequestAdded = await RentRequestCollection.create(requestData);

      res.status(201).json({ "msg": "Rent request added Successfully" });

    } catch (error) {
      res.status(500).json({ message: "Rent request Failed" , error});
    }
};

// Get all Rent Req with Pagination + Filters
const getAllRentReqController = async (req, res) => {
  try {
      const { skip , page, limit} = PaginationCalculate(req.query);
      const query = generateFilterQuery(req.query)
  
      // Fetch filtered data with pagination
      const  result = await RentRequestCollection.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate([
          {
          path: 'property', 
          select: 'propertyId price city areaName advanceMoney title propertyType flatMeasurement images'
          },
          {
          path: 'buyer',
          select: 'name phone address email image'
          },
          {
          path: 'seller',
          select: 'name phone address propertyName email image'
          }
      ]);
      const  totalCount = await RentRequestCollection.countDocuments(query);

      res.status(200).json({
      data: result,
      page: Number(page),
      limit: Number(limit),
      totalPage: Math.ceil(totalCount / limit),
      totalData: totalCount
      });
  } catch (error) {

    res.status(500).json({ message: "Rent Req Fetching Failed", error });
  }
};

//Request Action
const RentRequestActionController = async (req, res) => {
  
    const {id, status, property_id} = req.body;

    try {

    if (status === 'accepted') {
      const rentRequestAction = await RentRequestCollection.findByIdAndUpdate(id,{ status: status });

      const updatePropertyStatus = await PropertyCollection.findByIdAndUpdate(
        property_id,
        { status: "in_process" },
        { new: true }
      );
    res.status(201).json({ "msg": `Rent request ${status} Successfully` });
    }
    else{
      await RentRequestCollection.findByIdAndDelete(id);
      res.status(201).json({ "msg": `Rent request ${status} Successfully` });
    }

    } catch (error) {
      res.status(500).json({ message: "Rent request Failed" , error});
    }
};

//Get Specific Rent Request
const getSpecificRentReqController = async (req, res) => {
  try {
      const query = generateFilterQuery(req.query)
  
      // Fetch filtered data with pagination
      const  result = await RentRequestCollection.findOne(query).populate([
          {
          path: 'property', 
          select: 'propertyId price city areaName advanceMoney'
          },
          {
          path: 'buyer',
          select: 'name phone address email'
          },
              {
          path: 'seller',
          select: 'name phone address propertyName email'
          }
      ]);

      res.status(200).json({
      data: result,
      });
  } catch (error) {

    res.status(500).json({ message: "Rent Req Fetching Failed", error });
  }
};

module.exports = {
 RentRequestController,
 getAllRentReqController,
 RentRequestActionController,
 getSpecificRentReqController
};
  