const ConnectionCollection = require("../../../models/connection");
const { ObjectId } = require('mongodb');

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
  
    const query= req.query;

    try {
      if(query?.seller){
        const seller = ObjectId.createFromHexString(query?.seller);
      
        const result = await ConnectionCollection.find({seller: seller});

         res.status(201).json({ result });
      }else{
        const buyer = ObjectId.createFromHexString(query?.buyer);
      
        const result = await ConnectionCollection.find({buyer: buyer});

        res.status(201).json({ result });
      }
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
    