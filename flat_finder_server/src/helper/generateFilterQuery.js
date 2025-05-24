
const generateFilterQuery = (queryOptions) => {
    const {    minPrice,
          maxPrice,
          city,
          areaName,
          propertyType,
          minSqft,
          maxSqft,
          bedrooms, seller} = queryOptions;

          
        // Build dynamic query
        const query = {};
    
        // 1. Price Range
        if (minPrice && maxPrice) {
        query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
        }
    
        // 2. City, Area Name, Property Type
        if (city) query.city = city;
        if (areaName) query.areaName = areaName;
        if (propertyType) query.propertyType = propertyType;
    
        // 3. Floor Square Feet Range
        if (minSqft && maxSqft) {
        query.flatMeasurement = { $gte: Number(minSqft), $lte: Number(maxSqft) };
        }
    
        // 4. Bedroom count
        if (bedrooms) {
        query.bedrooms = Number(bedrooms);
        }
        if(seller){
            query.seller = seller
        }
    return query;
}

module.exports = {
   generateFilterQuery
  };