const ConnectionCollection = require("../../../models/connection");
const { ObjectId } = require('mongodb');
const { PaginationCalculate } = require("../../../helper/pagination");
const { generateFilterQuery } = require("../../../helper/generateFilterQuery");

//Creating Connection
const ConnectionController = async (req, res) => {
  
    const requestData = req.body;

    try {

      const result = await ConnectionCollection.create(requestData);

      res.status(201).json({ "msg": "Connection posted Successfully" });

    } catch (error) {
      res.status(500).json({ message: "Connection Posting Failed" , error});
      console.log(error);
    }
  };

const followCheckController = async (req, res) => {
  
    const requestData = req.body;

    try {

      const sellerId = ObjectId.createFromHexString(requestData?.seller);
      const buyerId = ObjectId.createFromHexString(requestData?.buyer);

        if (requestData?.unFollow) {
          const result = await ConnectionCollection.deleteOne({
            seller: sellerId,
            buyer: buyerId,
          });
          res.status(201).json({ "msg": "Connection removed Successfully" });
        } else {
          const result = await ConnectionCollection.findOne({
            seller: sellerId,
            buyer: buyerId,
          });
          res.status(201).json({ result});
        }

    } catch (error) {
      res.status(500).json({ message: "Get Specific Connection failed" , error});
      console.log(error);
    }
  };

const getAllFollowController = async (req, res) => {
    
    const query = generateFilterQuery(req.query)
    const { skip , page, limit} = PaginationCalculate(req.query);

    try {
        const  result = await ConnectionCollection.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate([
          {
          path: 'buyer',
          select: 'name phone address image _id'
          },
          {
          path: 'seller',
          select: 'name address propertyName image _id'
          }
      ]);
      
      const  totalCount = await ConnectionCollection.countDocuments(query);
  
      res.status(200).json({
        data: result,
        page: Number(page),
        limit: Number(limit),
        totalPage: Math.ceil(totalCount / limit),
        totalData: totalCount
      });

    } catch (error) {
      res.status(500).json({ message: "Connection get Failed" , error});
      console.log(error);
    }
  };

  module.exports = {
    ConnectionController,
    followCheckController,
    getAllFollowController
  };
    