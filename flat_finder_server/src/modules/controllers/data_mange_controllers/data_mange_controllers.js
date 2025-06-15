const PropertyCollection = require("../../../models/property");
const AreaNameCollection = require("../../../models/areaNames");


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
      
      const data = await AreaNameCollection.find({cityName: req.query.city});
        
      res.status(200).json({
      data: data
    });

    } catch (error) {
      res.status(500).json({ message: "addAreaName get Failed" , error});
    }
};


module.exports = {
  updateAllData,
  addAreaName,
  getAreaNameByCity
};
  