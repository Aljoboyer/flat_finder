const { addNotification } = require("../../notificationServ/notificationServ");

const commentHandlers = (io, socket, userSocketMap) => {
    socket.on("addComments", (comment) => {
        const targetSocketId = userSocketMap[comment?.sellerId];

        //sending comment to everyone
        io.emit("receivedcomments", comment)
        addNotification({...comment, type: 'new-comment'})

        //Creating comment roam for buyer so that they can get seller notification on comment
        if(!comment?.fromAuthor){
          socket.join(comment?.propertyId);
          socket.to(targetSocketId).emit("notifyseller", `Buyer: ${comment?.name} Commented on your Property`);
        }else{
           socket.join(comment?.propertyId);
          socket.to(comment?.propertyId).emit("notifybuyer", `The seller commented on a property you also commented on.`);
        }
        
      })
};

module.exports = { commentHandlers };
