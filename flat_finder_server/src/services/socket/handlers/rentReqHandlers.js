const { addNotification } = require("../../notificationServ/notificationServ");

const rentReqHandlers = (io, socket, userSocketMap) => {
    socket.on("sendRentReq", (rentReq) => {
        const targetSocketId = userSocketMap[rentReq?.receiver];
        
        socket.to(targetSocketId).emit("notifyuser", rentReq?.message);
        
        
        //adding to db 
        addNotification(rentReq)
      })

    socket.on("rentreqaction", (rentReq) => {
        const targetSocketId = userSocketMap[rentReq?.receiver];

        socket.to(targetSocketId).emit("notifyuser", rentReq?.message);
        
        //adding to db 
        addNotification(rentReq)
    })
};

module.exports = { rentReqHandlers };
