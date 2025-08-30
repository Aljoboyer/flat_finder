const { addNotification } = require("../../notificationServ/notificationServ");

const followHandler = (io, socket, userSocketMap) => {
    socket.on("followwing", (followObj) => {
        const targetSocketId = userSocketMap[followObj?.receiver];
        
        socket.to(targetSocketId).emit("notifyuser", followObj?.message);
        
        //adding to db 
        addNotification(followObj)

        socket.join(followObj?.receiver);
      })

   socket.on("join-roam", ({ roadmid }) => {
    console.log('joined roam ==>', roadmid)
        socket.join(roadmid);
    });
};

module.exports = { followHandler };
