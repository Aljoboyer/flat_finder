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


  module.exports = {
    ConnectionController
  };
    