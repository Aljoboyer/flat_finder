const { ObjectId } = require('mongodb');


const generateFilterQuery = (queryOptions) => {
    const {
          minPrice,
          maxPrice,
          city,
          areaName,
          propertyType,
          minSqft,
          maxSqft,
          bedRooms,
          seller,
          searchKey,
          status,
          cityName,
          bathrooms,
          purpose,
          property,
          paymentLastDate,
          createdAt,
          buyer,
        } = queryOptions;

          
        // Build dynamic query
        const query = {};
    
        // 1. Price Range
        if (minPrice && maxPrice) {
        query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
        }
    
        // 2. City, Area Name, Property Type
        
        if (city && typeof city == "string"){
            query.city = city;
        }
         if (areaName && typeof areaName == "string"){
            query.areaName = areaName;
        }
        if (cityName && typeof cityName == "string"){
            query.cityName = cityName;
        }
         if (propertyType && typeof propertyType == "string"){
            query.propertyType = propertyType;
        }
        if(purpose && typeof propertyType == "string"){
            query.purpose = purpose;
        }
        // 3. Floor Square Feet Range
        if (minSqft && maxSqft) {
            query.flatMeasurement = { $gte: Number(minSqft), $lte: Number(maxSqft) };
        }
    
        if (bedRooms && typeof bedRooms == "string") {
            query.bedRooms = Number(bedRooms);
        }
        if (bathrooms && typeof bathrooms == "string") {
            query.bathrooms = Number(bathrooms);
        }
        if(seller){
            query.seller =  ObjectId.createFromHexString(seller);
        }
        if(buyer){
            query.buyer = ObjectId.createFromHexString(buyer);
        }
        if (searchKey) {
            query.propertyId = { $regex: searchKey, $options: 'i' }; 
        }
        if(status){
            query.status = status
        }
        if(property){
            query.property = property;
        }
   
        if(paymentLastDate && paymentLastDate !== 'null' &&  paymentLastDate !== 'undefined'){
            query.paymentLastDate = paymentLastDate
        }
        if(createdAt  && createdAt !== 'null' &&  createdAt !== 'undefined'){
              const start = new Date(createdAt); 
            const end = new Date(new Date(createdAt).getTime() + 24 * 60 * 60 * 1000); 

            query.createdAt = { $gte: start, $lt: end };
        }
    return query;
}

module.exports = {
   generateFilterQuery
  };