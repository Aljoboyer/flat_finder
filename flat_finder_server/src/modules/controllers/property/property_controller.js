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

      const result = await PropertyCollection.find({});


    res.status(201).json({data: result});

    } catch (error) {
      res.status(500).json({ message: "Property Posting Failed" , error});
      console.log(error);
    }
  };


  module.exports = {
    propertyPostController,
    getAllPropertyController
  };
  