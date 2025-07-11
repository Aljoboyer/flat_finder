const mongoose = require('mongoose');
const RentRequestCollection = require("../../../models/rentRequest");
const PaymentCollection = require("../../../models/payment");
const PropertyCollection = require("../../../models/property");
const { PaginationCalculate } = require('../../../helper/pagination');
const { generateFilterQuery } = require('../../../helper/generateFilterQuery');
const moment = require('moment');

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
          select: '_id propertyId price city areaName advanceMoney title propertyType flatMeasurement images',

          },
          {
          path: 'buyer',
          select: 'name phone address email image _id'
          },
          {
          path: 'seller',
          select: 'name phone address propertyName email image _id'
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
      const query = generateFilterQuery(req.query)
  
      // Fetch filtered data with pagination
      const  result = await PaymentCollection.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate([
          {
          path: 'property', 
          select: '_id propertyId price city areaName advanceMoney title propertyType flatMeasurement images'
          },
          {
          path: 'buyer',
          select: 'name phone address email image _id'
          },
          {
          path: 'seller',
          select: 'name phone address propertyName email image _id'
          }
      ]);
      const  totalCount = await PaymentCollection.countDocuments(query);

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


module.exports = {
 RentRequestController,
 getAllRentReqController,
 RentRequestActionController,
 getSpecificRentReqController,
 getRentBuyHistoryController
};
  