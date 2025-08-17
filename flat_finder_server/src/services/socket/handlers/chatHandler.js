
const chatHandler = (io, socket, userSocketMap) => {
  socket.on("sendMessage", (msgObj) => {
      const targetSocketId = userSocketMap[msgObj.to];

      if (targetSocketId) {
        socket.to(targetSocketId).emit("receiveMessage", msgObj);
      } else {
        console.log('Target ID Not Found', targetSocketId);
      }

  });
  
};

module.exports = { chatHandler };
