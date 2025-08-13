const { addNotification } = require("../../notificationServ/notificationServ");

const rentReqHandlers = (io, socket, userSocketMap) => {
    socket.on("sendRendReq", (rentReq) => {
        const targetSocketId = userSocketMap[rentReq?.sellerId];

        //sending rentReq to everyone
        io.emit("receivedrentReq", rentReq)
        addNotification(rentReq)

        socket.to(targetSocketId).emit("notifyuser", rentReq?.message);
        
      })
};

module.exports = { rentReqHandlers };
