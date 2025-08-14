const NotificationCollection = require("../../../models/notification");
const ConnectionCollection = require("../../../models/connection");
const { ObjectId } = require('mongodb');
const { PaginationCalculate } = require("../../../helper/pagination");
const { generateFilterQuery } = require("../../../helper/generateFilterQuery");

//notification list 
const getNotificationListController = async (req, res) => {
    
    const query = generateFilterQuery(req.query)
    const { skip , page, limit} = PaginationCalculate(req.query);

    try {
      
      const  result = await NotificationCollection.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
      
      const  totalCount = await NotificationCollection.countDocuments(query);

      const  totalUnreadCount = await NotificationCollection.countDocuments({receiver: query?.receiver,isRead: false});
  
      res.status(200).json({
        data: result,
        page: Number(page),
        limit: Number(limit),
        totalPage: Math.ceil(totalCount / limit),
        totalData: totalCount,
        totalUnread: totalUnreadCount
      });

    } catch (error) {
      res.status(500).json({ message: "Notification get Failed" , error});
      
    }
  };

const updateNotificationCotroller = async (req, res) => {
  try {
    const {notifyId, updateType} = req.body;
    
       if(updateType == 'update'){
          const updateNotifyStatus = await NotificationCollection.findByIdAndUpdate(
          notifyId,
          { isRead: true },
          { new: true }
        );
       }
       else{
          const updateNotifyStatus = await NotificationCollection.findByIdAndDelete(notifyId);
       }
       
    res.status(500).json({ message: "Notification get Failed" , error});
  } catch (error) {
        res.status(500).json({ message: "Notification update Failed" , error});
  }
}

const getNotificationListControllerTest = async (req, res) => {
    
    const query = generateFilterQuery(req.query)
    // const { skip , page, limit} = PaginationCalculate(req.query);

    try {
      
      const receiver = ObjectId.createFromHexString(req.query?.receiver);

        // Step 1: Get sellers that this buyer follows
        const followedSellerIds = await ConnectionCollection
          .find({ buyer: receiver })
          .distinct("seller");
      console.log('followedSellerIds ===>', )
        // Step 2: Fetch both personal + broadcast notifications
        const notifications = await NotificationCollection.find({
          $or: [
            { receiver: receiver }, // personal notifications
            { 
              receiver: null,      // broadcast notifications
              sender: { $in: followedSellerIds }
            }
          ]
        })
        .sort({ createdAt: -1 })
      res.status(200).json({
        data: notifications,
        followedSellerIds
      });

    } catch (error) {
      res.status(500).json({ message: "Notification get Failed" , error});
      
    }
  };

  module.exports = {
    getNotificationListController,
    updateNotificationCotroller,
    getNotificationListControllerTest
  };
    