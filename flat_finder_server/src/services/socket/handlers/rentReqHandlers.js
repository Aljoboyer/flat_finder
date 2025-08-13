const { addNotification } = require("../../notificationServ/notificationServ");

const rentReqHandlers = (io, socket, userSocketMap) => {
    socket.on("sendRentReq", (rentReq) => {
        const targetSocketId = userSocketMap[rentReq?.sellerId];

        //sending rentReq to everyone
        addNotification(rentReq)

        socket.to(targetSocketId).emit("notifyuser", rentReq?.message);
        
      })

    socket.on("rentreqaction", (rentReq) => {
        const targetSocketId = userSocketMap[rentReq?.sellerId];

        //sending rentReq to everyone
        addNotification(rentReq)

        socket.to(targetSocketId).emit("notifyuser", rentReq?.message);
        
    })
};

module.exports = { rentReqHandlers };
