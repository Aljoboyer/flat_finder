const { addNotification } = require("../../notificationServ/notificationServ");

const postPropertyHandler = (io, socket, userSocketMap) => {
    socket.on("postedproperty", (followObj) => {
        const targetSocketId = userSocketMap[followObj?.receiver];
        
        socket.to(targetSocketId).emit("notifyuser", followObj?.message);
        
        //adding to db 
        addNotification(followObj)

      })
};

module.exports = { postPropertyHandler };
