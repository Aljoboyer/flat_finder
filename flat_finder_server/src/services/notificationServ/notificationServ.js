const NotificationCollection = require("../../models/notification");

const addNotification = async (notifyData) => {

    try {
      let reqObj = {}

      if(notifyData?.type == 'new-comment'){
        reqObj = {
          receiver: notifyData?.receiver,
          sender: notifyData?.commenterId,
          type: 'new-comment',
          message: `Buyer: ${notifyData?.name} Commented on your Property`,
          property: notifyData?.propertyId,
          isRead: false
        }
      }

      const newNotification = await NotificationCollection.create(reqObj);
      
      return
    } catch (error) {
      console.log('error ===>', )
     return
    }
  };

module.exports = {
   addNotification
};
  