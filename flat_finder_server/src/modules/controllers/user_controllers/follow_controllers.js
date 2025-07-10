const ConnectionCollection = require("../../../models/connection");

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
        if (requestData?.unFollow) {
          const result = await ConnectionCollection.deleteOne({
            seller: requestData?.seller,
            buyer: requestData?.buyer,
          });
          res.status(201).json({ "msg": "Connection removed Successfully" });
        } else {
          const result = await ConnectionCollection.findOne({
            seller: requestData?.seller,
            buyer: requestData?.buyer,
          });
          res.status(201).json({ data: result});
        }

    } catch (error) {
      res.status(500).json({ message: "Connection Posting Failed" , error});
      console.log(error);
    }
  };

  module.exports = {
    ConnectionController,
    followCheckController
  };
    