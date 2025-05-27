const reviewCollection = require("../../../models/review");

//Posting review
const reviewPostController = async (req, res) => {
  
    const requestData = req.body;

    try {

      const result = await reviewCollection.create(requestData);


    res.status(201).json({ "msg": "Review posted Successfully" });

    } catch (error) {
      res.status(500).json({ message: "review Posting Failed" , error});
      console.log(error);
    }
  };


  module.exports = {
    reviewPostController
  };
    