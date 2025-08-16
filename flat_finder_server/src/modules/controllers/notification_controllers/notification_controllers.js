const NotificationCollection = require("../../../models/notification");
const ConnectionCollection = require("../../../models/connection");
const { ObjectId } = require('mongodb');
const { PaginationCalculate } = require("../../../helper/pagination");
const { generateFilterQuery } = require("../../../helper/generateFilterQuery");

//notification list 
const getNotificationListController = async (req, res) => {
    const {role, isRead} = req.query
    const query = generateFilterQuery(req.query)
    const { skip , page, limit} = PaginationCalculate(req.query);

    try {

      if(role == 'seller'){
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
      }
      else{
          const receiver = ObjectId.createFromHexString(req.query?.receiver);

          // Step 1: Get sellers that this buyer follows
          const followedSellerIds = await ConnectionCollection
            .find({ buyer: receiver })
            .distinct("seller");
        
          // Step 2: Fetch both personal + broadcast notifications
          const query = {
            $or: [
              { receiver: receiver },
              { receiver: null, sender: { $in: followedSellerIds } }
            ]
          };

          // apply isRead filter only if it's provided (true or false)
          if (isRead === "true" || isRead === "false") {
            
            query.$or = query.$or.map(cond => ({
              ...cond,
              isRead
            }));
          }

          const notifications = await NotificationCollection.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));


          const  totalCount = await NotificationCollection.find({
            $or: [
              { receiver: receiver },
              { 
                receiver: null,
                sender: { $in: followedSellerIds }
              }
            ]
          })

           const Unreadquery = {
            $or: [
              { receiver: receiver },
              { receiver: null, sender: { $in: followedSellerIds } }
            ]
          };

           Unreadquery.$or = Unreadquery.$or.map(cond => ({
              ...cond,
              isRead: false
            }));

          const  totalUnreadCount = await NotificationCollection.countDocuments(Unreadquery)

          res.status(200).json({
            data: notifications,
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil( totalCount?.length / limit),
            totalData: totalCount?.length,
            totalUnread: totalUnreadCount
          });
      }

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

module.exports = {
  getNotificationListController,
  updateNotificationCotroller,
};
    