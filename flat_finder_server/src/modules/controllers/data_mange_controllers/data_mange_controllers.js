const AreaNameCollection = require("../../../models/areaNames");
const PropertyCollection = require("../../../models/property");
const { generateFilterQuery } = require("../../../helper/generateFilterQuery");
const RentRequestCollection = require("../../../models/rentRequest");
const ConnectionCollection = require("../../../models/connection");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//updating all data in porperty
const updateAllData = async (req, res) => {
  
    try {
      
      //  const allData =  await PropertyCollection.find({})
      
      //  allData?.forEach(async (item) => {
      //     const imgArray = item?.images?.map((img) => img)
       
      //       const updatedProperty = await PropertyCollection.findByIdAndUpdate(
      //       {_id: new ObjectId(item?._id)},
      //       {images: imgArray},
      //     );
      //  })
          
      res.status(201).json({ "msg": "all updated Successfully" });

    } catch (error) {
      res.status(500).json({ message: "Like Posting Failed" , error});
    }
};

//add area name
const addAreaName = async (req, res) => {
  
    try {
      
      const dataAdd = await AreaNameCollection.insertMany(req.body.areas);
        
      res.status(201).json({ "msg": "area name added Successfully", dataAdd: req.body.areas });

    } catch (error) {
      res.status(500).json({ message: "addAreaName Posting Failed" , error});
    }
};

//add area name
const getAreaNameByCity = async (req, res) => {
  
    try {
      const query = generateFilterQuery(req.query)
      
      const data = await AreaNameCollection.find(query);
        
      res.status(200).json({
      data: data
    });

    } catch (error) {
      res.status(500).json({ message: "addAreaName get Failed" , error});
    }
};

const getDashboardDataCount = async (req, res) => {
  
    try {
      const sellerid = ObjectId.createFromHexString(req.query.seller);
      
      const totalProperty = await PropertyCollection.countDocuments({seller: sellerid});
      const totalSold = await PropertyCollection.countDocuments({seller: sellerid, status: 'in_process'});
      const totalRequest = await RentRequestCollection.countDocuments({seller: sellerid, status: 'pending'});
      const totalPendingPayment = await RentRequestCollection.countDocuments({seller: sellerid, status: 'accepted'});
       const totalFollwers = await ConnectionCollection.countDocuments({seller: sellerid});

      res.status(200).json({
      totalProperty,
      totalSold,
      totalRequest,
      totalPendingPayment,
      totalFollwers
    });

    } catch (error) {
      res.status(500).json({ message: "addAreaName get Failed" , error});
    }
};


module.exports = {
  updateAllData,
  addAreaName,
  getAreaNameByCity,
  getDashboardDataCount
};
  