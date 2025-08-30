const { addNotification } = require("../../notificationServ/notificationServ");

const postPropertyHandler = (io, socket, userSocketMap) => {
    socket.on("postedproperty", (postpropertyObj) => {
        console.log('hitted here ==>', postpropertyObj)
        io.to(postpropertyObj?.connectionRoamId).emit("newpropertyposted", postpropertyObj?.message);
        
        //adding to db 
        addNotification(postpropertyObj)

      })
};

module.exports = { postPropertyHandler };
