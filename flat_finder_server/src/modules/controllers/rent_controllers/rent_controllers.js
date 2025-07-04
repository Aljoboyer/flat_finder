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
        if(req?.query?.seller){
            const { skip , page, limit} = PaginationCalculate(req.query);
            const query = generateFilterQuery(req.query)
        
            // Fetch filtered data with pagination
            const  result = await RentRequestCollection.find(query).skip(skip).limit(Number(limit)).populate([
                {
                path: 'property', 
                select: 'propertyId price city areaName advanceMoney'
                },
                {
                path: 'buyer',
                select: 'name phone address email'
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
        }
        else{
            res.status(200).json({ message: "Provide Seller Id" });
        }
  } catch (error) {

    res.status(500).json({ message: "Rent Req Fetching Failed", error });
  }
};

//Request Action
const RentRequestActionController = async (req, res) => {
  
    const {id, status, property_id} = req.body;

    try {

    if (status === 'accepted') {
      const rentRequestAction = await RentRequestCollection.findByIdAndUpdate(
                        id,
                        { status: status },);
      const updatePropertyStatus = await PropertyCollection.findByIdAndUpdate(
        property_id,
        { status: "in_process" },
        { new: true }
      );
    }
    else{
      await RentRequestCollection.findByIdAndDelete(id)
    }

    res.status(201).json({ "msg": `Rent request ${status} Successfully` });

    } catch (error) {
      res.status(500).json({ message: "Rent request Failed" , error});
    }
};


module.exports = {
 RentRequestController,
 getAllRentReqController,
 RentRequestActionController
};
  