//     const data = await PropertyCollection.find({})
//     data.forEach(async doc => {
//       const propertyId = generatePropertyId();
//       await PropertyCollection.updateOne(
//       { _id: doc._id },
//       { $set: { propertyId: propertyId } }
//     );
// });