

const getPipeLine = (skip, limit, matchQuery, city, areaName) => {
  const pipeline = [
      { $match: matchQuery },

      // Lookup property
      {
        $lookup: {
          from: 'properties', // collection name in MongoDB
          localField: 'property',
          foreignField: '_id',
          as: 'property',
        }
      },
      { $unwind: '$property' },

      // Apply filter on property.city or property.areaName
      ...(city || areaName
        ? [
            {
              $match: {
                ...(city ? { 'property.city': city } : {}),
                ...(areaName ? { 'property.areaName': areaName } : {})
              }
            }
          ]
        : []),

      // Lookup buyer
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer'
        }
      },
      { $unwind: '$buyer' },

      // Lookup seller
      {
        $lookup: {
          from: 'users',
          localField: 'seller',
          foreignField: '_id',
          as: 'seller'
        }
      },
      { $unwind: '$seller' },

      // Sort and paginate
      { $sort: { createdAt: -1 } },

      {
        $facet: {
          paginatedData: [{ $skip: skip }, { $limit: Number(limit) }],
          totalCount: [{ $count: 'count' }]
        }
      }
    ];
  return pipeline
}


module.exports = {
   getPipeLine
};