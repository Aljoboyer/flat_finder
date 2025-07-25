const RentRequestCollection = require("../../../models/rentRequest");
const PaymentCollection = require("../../../models/payment");
const PropertyCollection = require("../../../models/property");
const { PaginationCalculate } = require('../../../helper/pagination');
const { generateFilterQuery } = require('../../../helper/generateFilterQuery');
const moment = require('moment');
const { ObjectId } = require('mongodb');
const { getPipeLine } = require("../../../helper/generatePipeline");

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
    const { skip, page, limit } = PaginationCalculate(req.query);
    const { city, areaName } = req.query;

    const {city: cityNames, areaName: areaNames, ...matchQuery} = generateFilterQuery(req.query)

    const pipeline = getPipeLine(skip, limit, matchQuery, city, areaName)

    const result = await RentRequestCollection.aggregate(pipeline);

    const totalCount = result[0]?.totalCount[0]?.count || 0;

    res.status(200).json({
      data: result[0].paginatedData,
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
      const today = new Date(); // e.g., '7/6/2025'
      const oneWeekLater = new Date();
      oneWeekLater.setDate(today.getDate() + 7);

      const rentRequestAction = await RentRequestCollection.findByIdAndUpdate(id,{ status: status ,paymentLastDate: moment(oneWeekLater).format('DD/MM/YYYY')});

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

//get all rent history
const getRentBuyHistoryController = async (req, res) => {
  try {
      const { skip , page, limit} = PaginationCalculate(req.query);
      const { city, areaName } = req.query;

      const {city: cityNames, areaName: areaNames, ...matchQuery} = generateFilterQuery(req.query)

      const pipeline = getPipeLine(skip, limit, matchQuery, city, areaName)
    
      // Fetch filtered data with pagination
      const  result = await PaymentCollection.aggregate(pipeline);

      const totalCount = result[0]?.totalCount[0]?.count || 0;

      res.status(200).json({
      data: result[0].paginatedData,
      page: Number(page),
      limit: Number(limit),
      totalPage: Math.ceil(totalCount / limit),
      totalData: totalCount
    });
  } catch (error) {

    res.status(500).json({ message: "Rent Req Fetching Failed", error });
  }
};


module.exports = {
 RentRequestController,
 getAllRentReqController,
 RentRequestActionController,
 getSpecificRentReqController,
 getRentBuyHistoryController
};
  