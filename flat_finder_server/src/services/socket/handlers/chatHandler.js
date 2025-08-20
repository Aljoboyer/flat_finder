
const chatHandler = (io, socket, userSocketMap) => {
  socket.on("sendMessage", (msgObj) => {
      const targetSocketId = userSocketMap[msgObj.to];

      if (targetSocketId) {
        socket.to(targetSocketId).emit("receiveMessage", msgObj);
      } else {
        console.log('Target ID Not Found', targetSocketId);
      }

  });
  
  socket.on('typingon', ({to, from}) => {
    const targetSocketId = userSocketMap[to];
   
    socket.to(targetSocketId).emit("typingstatuson", {to, from})
  })

  socket.on('typingoff', ({to, from}) => {
    const targetSocketId = userSocketMap[to];
    socket.to(targetSocketId).emit("typingstatusoff", {to, from})
  })

};

module.exports = { chatHandler };
