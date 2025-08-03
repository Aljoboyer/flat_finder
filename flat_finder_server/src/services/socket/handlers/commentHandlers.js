
const commentHandlers = (io, socket, userSocketMap) => {
    socket.on("addComments", (comment) => {
        const targetSocketId = userSocketMap[comment?.sellerId];

        //sending comment to everyone
        io.emit("receivedcomments", comment)

        //Creating comment roam for buyer so that they can get seller notification on comment
        if(!comment?.fromAuthor){
          socket.join(comment?.propertyId);
          socket.to(targetSocketId).emit("notifyseller", `buyer: ${comment?.name} Commented on your Blog`);
        }else{
          
        }
        
      })
};

module.exports = { commentHandlers };
