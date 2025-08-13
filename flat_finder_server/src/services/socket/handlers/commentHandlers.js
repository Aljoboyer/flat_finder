const { addNotification } = require("../../notificationServ/notificationServ");

const commentHandlers = (io, socket, userSocketMap) => {
    socket.on("addComments", (comment) => {
        const targetSocketId = userSocketMap[comment?.sellerId];

        //sending comment to everyone
        io.emit("receivedcomments", comment)

        const notificationObj = {
            receiver: comment?.receiver,
            sender: comment?.commenterId,
            message: `${comment?.fromAuthor ? 'Seller' : 'Buyer'}: ${comment?.name} ${comment?.fromAuthor ? 'seller commented on a property you also commented on.' : 'Commented on your Property'}`,
            property: comment?.propertyId,
            isRead: false,
            type: comment?.type
        }
        addNotification(notificationObj)

        //Creating comment roam for buyer so that they can get seller notification on comment
        if(!comment?.fromAuthor){
          socket.join(comment?.propertyId);
          socket.to(targetSocketId).emit("notifyseller", `Buyer: ${comment?.name} Commented on your Property`);
        }else{
           socket.join(comment?.propertyId);
          socket.to(comment?.propertyId).emit("notifybuyer", `Seller commented on a property you also commented on.`);
        }
        
      })
};

module.exports = { commentHandlers };
