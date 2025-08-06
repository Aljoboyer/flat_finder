const NotificationCollection = require("../../../models/notification");
const { ObjectId } = require('mongodb');
const { PaginationCalculate } = require("../../../helper/pagination");
const { generateFilterQuery } = require("../../../helper/generateFilterQuery");

//
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

  module.exports = {
    getNotificationListController,
  };
    