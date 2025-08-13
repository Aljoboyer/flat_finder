const { addNotification } = require("../../notificationServ/notificationServ");

const followHandler = (io, socket, userSocketMap) => {
    socket.on("followwing", (rentReq) => {
        const targetSocketId = userSocketMap[rentReq?.receiver];
        
        socket.to(targetSocketId).emit("notifyuser", rentReq?.message);
        
        //adding to db 
        addNotification(rentReq)
      })
};

module.exports = { followHandler };
