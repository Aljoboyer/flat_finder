const NotificationCollection = require("../../models/notification");

const addNotification = async (notifyData) => {

    try {
      const newNotification = await NotificationCollection.create(notifyData);
      return
    } catch (error) {
      console.log('error ===>', error)
     return
    }
  };

module.exports = {
   addNotification
};
  